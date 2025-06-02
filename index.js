const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'raw_articles.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    time TEXT,
    link TEXT UNIQUE,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_url TEXT,
    article_selector TEXT,
    title_selector TEXT,
    description_selector TEXT,
    time_selector TEXT,
    link_selector TEXT,
    image_selector TEXT
  )`);

  db.get('SELECT COUNT(*) as count FROM sources', (err, row) => {
    if (err) {
      return console.error('Failed to check sources table', err);
    }
    if (row.count === 0) {
      const insert = `INSERT INTO sources
        (base_url, article_selector, title_selector, description_selector,
         time_selector, link_selector, image_selector)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.run(
        insert,
        [
          'https://www.newswire.ca/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/?page=1&pagesize=100',
          'div.col-sm-12.card',
          'h3',
          'p',
          'h3 small',
          'a.newsreleaseconsolidatelink',
          null,
        ],
        err2 => {
          if (err2) {
            console.error('Failed to insert default source', err2);
          }
        }
      );
    }
  });
});

// Endpoint to get all articles
app.get('/articles', (req, res) => {
  db.all('SELECT id, title, description, time, link FROM articles ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve articles' });
    }
    res.json(rows);
  });
});

// Endpoint to get article statistics
app.get('/stats', (req, res) => {
  db.all('SELECT link FROM articles', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve stats' });
    }

    const bySource = {};
    rows.forEach(r => {
      try {
        const origin = new URL(r.link).origin;
        bySource[origin] = (bySource[origin] || 0) + 1;
      } catch (e) {}
    });

    db.get('SELECT COUNT(*) as total, MAX(created_at) as latest FROM articles', (err2, row) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ error: 'Failed to retrieve stats' });
      }
      res.json({ total: row.total, latest: row.latest, bySource });
    });
  });
});

// Endpoint to get all scraping sources
app.get('/sources', (req, res) => {
  db.all('SELECT * FROM sources', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve sources' });
    }
    res.json(rows);
  });
});

// Endpoint to add a new scraping source
app.post('/sources', (req, res) => {
  const {
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector
  ];

  db.run(
    `INSERT INTO sources (base_url, article_selector, title_selector, description_selector, time_selector, link_selector, image_selector)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    params,
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add source' });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint to delete a scraping source
app.delete('/sources/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM sources WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete source' });
    }
    res.json({ deleted: this.changes });
  });
});

// Endpoint to update a scraping source
app.put('/sources/:id', (req, res) => {
  const { id } = req.params;
  const {
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    id,
  ];

  db.run(
    `UPDATE sources SET base_url = ?, article_selector = ?, title_selector = ?, description_selector = ?, time_selector = ?, link_selector = ?, image_selector = ? WHERE id = ?`,
    params,
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update source' });
      }
      res.json({ updated: this.changes });
    }
  );
});

async function scrapeSource(source) {
  const response = await axios.get(source.base_url);
  const $ = cheerio.load(response.data);

  const articles = [];
  $(source.article_selector).each((i, el) => {
    const container = $(el);
    let time = '';
    if (source.time_selector) {
      time = container.find(source.time_selector).text().trim();
      container.find(source.time_selector).remove();
    }
    const title = container.find(source.title_selector).text().trim();
    const description = source.description_selector
      ? container.find(source.description_selector).text().trim()
      : '';
    let link = source.link_selector
      ? container.find(source.link_selector).attr('href') || ''
      : '';
    if (link && !link.startsWith('http')) {
      try {
        link = new URL(link, source.base_url).href;
      } catch (e) {}
    }
    const image = source.image_selector
      ? container.find(source.image_selector).attr('src') || null
      : null;

    articles.push({ title, description, time, link, image });
  });

  return articles;
}

// Scrape endpoint
app.get('/scrape', async (req, res) => {
  const logs = [];
  try {
    const sources = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM sources', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

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

      const insertPromises = articles.map(a => {
        return new Promise((resolve, reject) => {
          db.run(
            'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?)',
            [a.title, a.description, a.time, a.link, a.image],
            function (err) {
              if (err) return reject(err);
              resolve(this.changes); // 1 if inserted, 0 if ignored
            }
          );
        });
      });

      const results = await Promise.all(insertPromises);
      const inserted = results.reduce((acc, cur) => acc + cur, 0);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
