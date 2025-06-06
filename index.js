const express = require('express');
const path = require('path');
const db = require('./db');
const configDb = require('./configDb');
const { runFilters } = require('./lib/filters');
const { scrapeSource } = require('./lib/scraper');
const { OpenAI } = require('openai');
const createPipeline = require('./lib/enrichment/pipeline');



const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, configDb, openai);

let stopPipeline = false;

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

  await configDb.run(`CREATE TABLE IF NOT EXISTS filters (
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
    FOREIGN KEY(article_id) REFERENCES articles(id)
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

  await db.run(`CREATE TABLE IF NOT EXISTS article_enrichment_steps (
    article_id INTEGER,
    step_name TEXT,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(article_id, step_name),
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  const stepCountRow = await db.get('SELECT COUNT(*) as count FROM article_enrichment_steps');
  if (stepCountRow.count === 0) {
    const rows = await db.all('SELECT article_id, completed, embedding FROM article_enrichments');
    for (const r of rows) {
      let steps = [];
      if (r.completed) {
        steps = r.completed.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (r.embedding && !steps.includes('embedding')) steps.push('embedding');
      for (const s of steps) {
        await db.run(
          'INSERT OR IGNORE INTO article_enrichment_steps (article_id, step_name) VALUES (?, ?)',
          [r.article_id, s]
        );
      }
    }
  }

  await configDb.run(`CREATE TABLE IF NOT EXISTS prompts (
    name TEXT PRIMARY KEY,
    template TEXT
  )`);

  const promptRow = await configDb.get(
    'SELECT COUNT(*) as count FROM prompts WHERE name = ?',
    ['extractParties']
  );
  if (promptRow.count === 0) {
    await configDb.run(
      'INSERT INTO prompts (name, template) VALUES (?, ?)',
      [
        'extractParties',
        'Extract the acquiror, seller, target and the transaction type ("M&A", "Financing" or "Other"). Anything relating to one party buying, acquiring another is considered "M&A". The target and seller are often the same in an M&A transaction, but the target may also be select assets or a division of the seller. In a financing, the company issuing the financing is the seller. If none are mentioned, respond with JSON {"acquiror":"N/A","seller":"N/A","target":"N/A","transactionType":"Other"}.  Text: "{text}"'
      ]
    );
  }

  const sumRow = await configDb.get(
    'SELECT COUNT(*) as count FROM prompts WHERE name = ?',
    ['summarizeArticle']
  );
  if (sumRow.count === 0) {
    await configDb.run(
      'INSERT INTO prompts (name, template) VALUES (?, ?)',
      [
        'summarizeArticle',
        'Summarize the following article in 2-3 sentences and classify the Clairfield sector and industry. Respond with JSON {"summary":"...","sector":"...","industry":"..."}. Text: "{text}"'
      ]
    );
  }

  const valRow = await configDb.get(
    'SELECT COUNT(*) as count FROM prompts WHERE name = ?',
    ['extractValueLocation']
  );
  if (valRow.count === 0) {
    await configDb.run(
      'INSERT INTO prompts (name, template) VALUES (?, ?)',
      [
        'extractValueLocation',
        'Extract the transaction value in US dollars from the article text if mentioned. If none is present respond with "undisclosed". Review the provided location "{location}" and return a more complete location including country if possible. Respond with JSON {"dealValue":"...","location":"..."}. Text: "{text}"'
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
  const hasSummary = aeInfo.some(r => r.name === 'summary');
  if (!hasSummary) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN summary TEXT');
  }
  const hasSector = aeInfo.some(r => r.name === 'sector');
  if (!hasSector) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN sector TEXT');
  }

  await configDb.run(`CREATE TABLE IF NOT EXISTS sources (
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

  const srcInfo = await configDb.all('PRAGMA table_info(sources)');
  const hasBodySel = srcInfo.some(r => r.name === 'body_selector');
  if (!hasBodySel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN body_selector TEXT');
  }
  const hasLocationSel = srcInfo.some(r => r.name === 'location_selector');
  if (!hasLocationSel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN location_selector TEXT');
  }
  const hasDateSel = srcInfo.some(r => r.name === 'date_selector');
  if (!hasDateSel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN date_selector TEXT');
  }

  const row = await configDb.get('SELECT COUNT(*) as count FROM sources');
  if (row.count === 0) {
    const insert = `INSERT INTO sources
        (base_url, article_selector, title_selector, description_selector,
         time_selector, link_selector, image_selector, body_selector,
         location_selector, date_selector)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await configDb.run(insert, [
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
app.use('/pipeline', require('./routes/pipeline'));



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

    const row = await db.get(
      'SELECT COUNT(*) as total, MAX(created_at) as latestScrape, MIN(created_at) as earliestScrape, MIN(time) as earliestArticle FROM articles'
    );
    res.json({
      total: row.total,
      latest: row.latestScrape,
      earliestScrape: row.earliestScrape,
      earliestArticle: row.earliestArticle,
      bySource
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});



// Scrape endpoint
app.get('/scrape', async (req, res) => {
  const logs = [];
  try {
    const sources = await configDb.all('SELECT * FROM sources');

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
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.lastID);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {

        await runFilters(db, configDb, insertedIds, logs);

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
    const sources = await configDb.all('SELECT * FROM sources');
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
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.lastID);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);

      if (insertedIds.length) {
        await runFilters(db, configDb, insertedIds, logs);
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

// Streaming version of the full pipeline using Server-Sent Events
app.get('/scrape-enrich-stream', async (req, res) => {
  stopPipeline = false;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const logs = [];
  const send = msg => res.write(`data: ${msg}\n\n`);

  try {
    const sources = await configDb.all('SELECT * FROM sources');
    send(`Found ${sources.length} sources`);

    let insertedTotal = 0;
    let enrichedTotal = 0;

    const toEnrich = [];


    for (const source of sources) {
      if (stopPipeline) {
        send('Pipeline stopped');
        res.write(`event: done\ndata: ${JSON.stringify({ stopped: true })}\n\n`);
        return res.end();
      }
      send(`Fetching ${source.base_url}`);
      let articles;
      try {
        articles = await scrapeSource(source);
        send(`Loaded ${articles.length} articles from ${source.base_url}`);
      } catch (e) {
        send(`Failed to fetch ${source.base_url}: ${e.message}`);
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
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.lastID);
      insertedTotal += inserted;
      send(`Inserted ${inserted} new articles from ${source.base_url}`);

      if (insertedIds.length) {
        await runFilters(db, configDb, insertedIds, logs);
        logs.forEach(send);
        logs.length = 0;

        const placeholders = insertedIds.map(() => '?').join(',');
        const rows = await db.all(
          `SELECT DISTINCT article_id FROM article_filter_matches WHERE article_id IN (${placeholders})`,
          insertedIds
        );
        const matchedIds = rows.map(r => r.article_id);

        toEnrich.push(...matchedIds);
      }
    }

    const totalToEnrich = toEnrich.length;
    send(`Inserted total ${insertedTotal} new articles`);
    send(`Enriching ${totalToEnrich} articles`);
    let count = 0;
    for (const id of toEnrich) {
      if (stopPipeline) {
        send('Pipeline stopped');
        res.write(`event: done\ndata: ${JSON.stringify({ stopped: true })}\n\n`);
        return res.end();
      }
      try {
        await processArticle(id);
        count++;
        enrichedTotal++;
        send(`Enriched ${count}/${totalToEnrich}`);
      } catch (e) {
        send(`Failed to enrich article ${id}: ${e.message}`);
      }
    }

    send(`Enriched total ${enrichedTotal} articles`);
    res.write(`event: done\ndata: ${JSON.stringify({ inserted: insertedTotal, enriched: enrichedTotal })}\n\n`);
    res.end();
  } catch (err) {
    console.error(err);
    send(`Error: ${err.message}`);
    res.write(`event: done\ndata: ${JSON.stringify({ error: 'Full scrape failed' })}\n\n`);
    res.end();
  }
});

app.post('/stop-pipeline', (req, res) => {
  stopPipeline = true;
  res.json({ stopped: true });
});

// Re-run filters for all existing articles
app.get('/run-filters', async (req, res) => {
  const logs = [];
  try {
    const rows = await db.all('SELECT id FROM articles');
    const ids = rows.map(r => r.id);

    await db.run('DELETE FROM article_filter_matches');
    logs.push('Cleared previous filter matches');

    await runFilters(db, configDb, ids, logs);
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

// Run the full scrape & enrich pipeline once every 24 hours
const DAY_MS = 24 * 60 * 60 * 1000;
async function runScheduledPipeline() {
  try {
    const res = await fetch(`http://localhost:${PORT}/scrape-enrich`);
    const data = await res.json();
    console.log('Scheduled pipeline result:', data);
  } catch (err) {
    console.error('Scheduled pipeline failed', err);
  }
}
setInterval(runScheduledPipeline, DAY_MS);
