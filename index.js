const express = require('express');
const path = require('path');
const db = require('./db');
const { runFilters } = require('./lib/filters');
const { scrapeSource } = require('./lib/scraper');
const { OpenAI } = require('openai');
const createPipeline = require('./lib/enrichment/pipeline');



const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, openai);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Initialize SQLite database
async function initDb() {
  await db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    time TEXT,
    link TEXT UNIQUE,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS filters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT NOT NULL, -- 'keyword' or 'embedding'
    value TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS article_filter_matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    filter_id INTEGER,
    matched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(article_id) REFERENCES articles(id),
    FOREIGN KEY(filter_id) REFERENCES filters(id)
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS article_enrichments (
    article_id INTEGER PRIMARY KEY,
    embedding TEXT,
    is_mna INTEGER,
    acquiror TEXT,
    seller TEXT,
    target TEXT,
    deal_value TEXT,
    industry TEXT,
    extra TEXT,
    article_date TEXT,
    location TEXT,
    body TEXT,
    transaction_type TEXT,
    completed TEXT,
    log TEXT,
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS prompts (
    name TEXT PRIMARY KEY,
    template TEXT
  )`);

  const promptRow = await db.get(
    'SELECT COUNT(*) as count FROM prompts WHERE name = ?',
    ['extractParties']
  );
  if (promptRow.count === 0) {
    await db.run(
      'INSERT INTO prompts (name, template) VALUES (?, ?)',
      [
        'extractParties',
        'Extract the acquiror, seller, target and the transaction type ("M&A", "Financing" or "Other"). Anything relating to one party buying, acquiring another is considered "M&A". The target and seller are often the same in an M&A transaction, but the target may also be select assets or a division of the seller. In a financing, the company issuing the financing is the seller. If none are mentioned, respond with JSON {"acquiror":"N/A","seller":"N/A","target":"N/A","transactionType":"Other"}.  Text: "{text}"'
      ]
    );
  }

  const aeInfo = await db.all('PRAGMA table_info(article_enrichments)');
  const hasBody = aeInfo.some(r => r.name === 'body');
  if (!hasBody) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN body TEXT');
  }
  const hasSeller = aeInfo.some(r => r.name === 'seller');
  if (!hasSeller) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN seller TEXT');
  }
  const hasCompleted = aeInfo.some(r => r.name === 'completed');
  if (!hasCompleted) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN completed TEXT');
  }
  const hasDate = aeInfo.some(r => r.name === 'article_date');
  if (!hasDate) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN article_date TEXT');
  }
  const hasLocation = aeInfo.some(r => r.name === 'location');
  if (!hasLocation) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN location TEXT');
  }
  const hasTx = aeInfo.some(r => r.name === 'transaction_type');
  if (!hasTx) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN transaction_type TEXT');
  }
  const hasLog = aeInfo.some(r => r.name === 'log');
  if (!hasLog) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN log TEXT');
  }

  await db.run(`CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_url TEXT,
    article_selector TEXT,
    title_selector TEXT,
    description_selector TEXT,
    time_selector TEXT,
    link_selector TEXT,
    image_selector TEXT,
    body_selector TEXT,
    location_selector TEXT,
    date_selector TEXT
  )`);

  const srcInfo = await db.all('PRAGMA table_info(sources)');
  const hasBodySel = srcInfo.some(r => r.name === 'body_selector');
  if (!hasBodySel) {
    await db.run('ALTER TABLE sources ADD COLUMN body_selector TEXT');
  }
  const hasLocationSel = srcInfo.some(r => r.name === 'location_selector');
  if (!hasLocationSel) {
    await db.run('ALTER TABLE sources ADD COLUMN location_selector TEXT');
  }
  const hasDateSel = srcInfo.some(r => r.name === 'date_selector');
  if (!hasDateSel) {
    await db.run('ALTER TABLE sources ADD COLUMN date_selector TEXT');
  }

  const row = await db.get('SELECT COUNT(*) as count FROM sources');
  if (row.count === 0) {
    const insert = `INSERT INTO sources
        (base_url, article_selector, title_selector, description_selector,
         time_selector, link_selector, image_selector, body_selector,
         location_selector, date_selector)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.run(insert, [
      'https://www.newswire.ca/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/?page=1&pagesize=100',
      'div.col-sm-12.card',
      'h3',
      'p',
      'h3 small',
      'a.newsreleaseconsolidatelink',
      null,
      '#release-body',
      'span.xn-location',
      'span.xn-chron'
    ]);
  }
}

initDb().catch(err => console.error('Failed to init db', err));
app.use('/articles', require('./routes/articles'));
app.use('/sources', require('./routes/sources'));
app.use('/filters', require('./routes/filters'));
app.use('/prompts', require('./routes/prompts'));



// Endpoint to get article statistics
app.get('/stats', async (req, res) => {
  try {
    const rows = await db.all('SELECT link FROM articles');
    const bySource = {};
    rows.forEach(r => {
      try {
        const origin = new URL(r.link).origin;
        bySource[origin] = (bySource[origin] || 0) + 1;
      } catch (e) {}
    });

    const row = await db.get('SELECT COUNT(*) as total, MAX(created_at) as latest FROM articles');
    res.json({ total: row.total, latest: row.latest, bySource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});



// Scrape endpoint
app.get('/scrape', async (req, res) => {
  const logs = [];
  try {
    const sources = await db.all('SELECT * FROM sources');

    logs.push(`Found ${sources.length} sources`);

    let insertedTotal = 0;
    const details = [];

    for (const source of sources) {
      logs.push(`Fetching ${source.base_url}`);
      let articles;
      try {
        articles = await scrapeSource(source);
        logs.push(`Loaded ${articles.length} articles from ${source.base_url}`);
      } catch (e) {
        logs.push(`Failed to fetch ${source.base_url}: ${e.message}`);
        continue;
      }

      const insertPromises = articles.map(a =>
        db.run(
          'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?)',
          [a.title, a.description, a.time, a.link, a.image]
        )
      );

      const results = await Promise.all(insertPromises);
      const inserted = results.reduce((acc, cur) => acc + cur.changes, 0);
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.id);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {

        await runFilters(db, insertedIds, logs);

      }
      details.push({
        source_id: source.id,
        base_url: source.base_url,
        scraped: articles.length,
        inserted
      });
    }

    logs.push(`Inserted total ${insertedTotal} new articles`);
    res.json({ inserted: insertedTotal, details, logs });
  } catch (err) {
    console.error(err);
    logs.push(`Error: ${err.message}`);
    res.status(500).json({ error: 'Scraping failed', logs });
  }
});

// Scrape, filter and enrich newly added matching articles
app.get('/scrape-enrich', async (req, res) => {
  const logs = [];
  try {
    const sources = await db.all('SELECT * FROM sources');
    logs.push(`Found ${sources.length} sources`);

    let insertedTotal = 0;
    let enrichedTotal = 0;
    const details = [];

    for (const source of sources) {
      logs.push(`Fetching ${source.base_url}`);
      let articles;
      try {
        articles = await scrapeSource(source);
        logs.push(`Loaded ${articles.length} articles from ${source.base_url}`);
      } catch (e) {
        logs.push(`Failed to fetch ${source.base_url}: ${e.message}`);
        continue;
      }

      const insertPromises = articles.map(a =>
        db.run(
          'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?)',
          [a.title, a.description, a.time, a.link, a.image]
        )
      );

      const results = await Promise.all(insertPromises);
      const inserted = results.reduce((acc, cur) => acc + cur.changes, 0);
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.id);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);

      if (insertedIds.length) {
        await runFilters(db, insertedIds, logs);
        const placeholders = insertedIds.map(() => '?').join(',');
        const rows = await db.all(
          `SELECT DISTINCT article_id FROM article_filter_matches WHERE article_id IN (${placeholders})`,
          insertedIds
        );
        const matchedIds = rows.map(r => r.article_id);
        for (const id of matchedIds) {
          try {
            await processArticle(id);
            enrichedTotal++;
            logs.push(`Enriched article ${id}`);
          } catch (e) {
            logs.push(`Failed to enrich article ${id}: ${e.message}`);
          }
        }
      }

      details.push({
        source_id: source.id,
        base_url: source.base_url,
        scraped: articles.length,
        inserted
      });
    }

    logs.push(`Inserted total ${insertedTotal} new articles`);
    logs.push(`Enriched total ${enrichedTotal} articles`);
    res.json({ inserted: insertedTotal, enriched: enrichedTotal, details, logs });
  } catch (err) {
    console.error(err);
    logs.push(`Error: ${err.message}`);
    res.status(500).json({ error: 'Full scrape failed', logs });
  }
});

// Re-run filters for all existing articles
app.get('/run-filters', async (req, res) => {
  const logs = [];
  try {
    const rows = await db.all('SELECT id FROM articles');
    const ids = rows.map(r => r.id);

    await db.run('DELETE FROM article_filter_matches');
    logs.push('Cleared previous filter matches');

    await runFilters(db, ids, logs);
    res.json({ processed: ids.length, logs });
  } catch (err) {
    console.error(err);
    logs.push(`Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to run filters', logs });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
