const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { OpenAI } = require('openai');
const { parseOpenAIResponse, getFirstSentence } = require('./lib/extractParties');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

  db.run(`CREATE TABLE IF NOT EXISTS filters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT NOT NULL, -- 'keyword' or 'embedding'
    value TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS article_filter_matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    filter_id INTEGER,
    matched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(article_id) REFERENCES articles(id),
    FOREIGN KEY(filter_id) REFERENCES filters(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS article_enrichments (
    article_id INTEGER PRIMARY KEY,
    embedding TEXT,
    is_mna INTEGER,
    acquiror TEXT,
    target TEXT,
    deal_value TEXT,
    industry TEXT,
    extra TEXT,
    body TEXT,
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  db.all('PRAGMA table_info(article_enrichments)', (err, rows) => {
    if (!err) {
      const hasBody = rows.some(r => r.name === 'body');
      if (!hasBody) {
        db.run('ALTER TABLE article_enrichments ADD COLUMN body TEXT');
      }
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_url TEXT,
    article_selector TEXT,
    title_selector TEXT,
    description_selector TEXT,
    time_selector TEXT,
    link_selector TEXT,
    image_selector TEXT,
    body_selector TEXT
  )`);

  db.all('PRAGMA table_info(sources)', (err, rows) => {
    if (!err) {
      const hasBody = rows.some(r => r.name === 'body_selector');
      if (!hasBody) {
        db.run('ALTER TABLE sources ADD COLUMN body_selector TEXT');
      }
    }
  });

  db.get('SELECT COUNT(*) as count FROM sources', (err, row) => {
    if (err) {
      return console.error('Failed to check sources table', err);
    }
    if (row.count === 0) {
      const insert = `INSERT INTO sources
        (base_url, article_selector, title_selector, description_selector,
         time_selector, link_selector, image_selector, body_selector)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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
          '#release-body'
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
  const query = `
    SELECT
      a.id,
      a.title,
      a.description,
      a.time,
      a.link,
      GROUP_CONCAT(f.id) as filter_ids,
      GROUP_CONCAT(f.name) as filter_names
    FROM articles a
    LEFT JOIN article_filter_matches m ON a.id = m.article_id
    LEFT JOIN filters f ON f.id = m.filter_id
    GROUP BY a.id
    ORDER BY a.created_at DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve articles' });
    }
    rows.forEach(r => {
      r.filter_ids = r.filter_ids
        ? r.filter_ids.split(',').map(id => parseInt(id, 10))
        : [];
      r.filter_names = r.filter_names ? r.filter_names.split(',') : [];
      r.matched = r.filter_ids.length > 0;
    });
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
    image_selector,
    body_selector
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector
  ];

  db.run(
    `INSERT INTO sources (base_url, article_selector, title_selector, description_selector, time_selector, link_selector, image_selector, body_selector)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
    body_selector,
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector,
    id,
  ];

  db.run(
    `UPDATE sources SET base_url = ?, article_selector = ?, title_selector = ?, description_selector = ?, time_selector = ?, link_selector = ?, image_selector = ?, body_selector = ? WHERE id = ?`,
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

// Get all filters
app.get('/filters', (req, res) => {
  db.all('SELECT * FROM filters', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve filters' });
    }
    res.json(rows);
  });
});

// Add a filter
app.post('/filters', (req, res) => {
  const { name, type, value, active = 1 } = req.body;
  db.run(
    'INSERT INTO filters (name, type, value, active) VALUES (?, ?, ?, ?)',
    [name, type, value, active],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add filter' });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a filter
app.put('/filters/:id', (req, res) => {
  const { id } = req.params;
  const { name, type, value, active } = req.body;
  db.run(
    'UPDATE filters SET name = ?, type = ?, value = ?, active = ? WHERE id = ?',
    [name, type, value, active, id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update filter' });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a filter
app.delete('/filters/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM filters WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete filter' });
    }
    res.json({ deleted: this.changes });
  });
});

async function runFilters(articleIds, logs) {
  if (!articleIds.length) return;
  const filters = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM filters WHERE active = 1', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

  if (!filters.length) {
    logs && logs.push('No active filters to run');
    return;
  }

  for (const id of articleIds) {
    const article = await new Promise((resolve, reject) => {
      db.get('SELECT title, description FROM articles WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
    if (!article) continue;

    for (const filter of filters) {
      if (filter.type === 'keyword') {
        const keywords = (filter.value || '')
          .split(',')
          .map(k => k.trim().toLowerCase())
          .filter(Boolean);
        const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
        const matched = keywords.some(kw => text.includes(kw));
        if (matched) {
          await new Promise((resolve, reject) => {
            db.run(
              'INSERT INTO article_filter_matches (article_id, filter_id) VALUES (?, ?)',
              [id, filter.id],
              err => (err ? reject(err) : resolve())
            );
          });
        }
      } else if (filter.type === 'embedding') {
        // TODO: implement semantic filtering using embeddings
      }
    }
  }
  logs && logs.push(`Ran ${filters.length} filters on ${articleIds.length} articles`);
}

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
              resolve({ changes: this.changes, id: this.lastID });
            }
          );
        });
      });

      const results = await Promise.all(insertPromises);
      const inserted = results.reduce((acc, cur) => acc + cur.changes, 0);
      const insertedIds = results.filter(r => r.changes > 0).map(r => r.id);
      insertedTotal += inserted;
      logs.push(`Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {
        await runFilters(insertedIds, logs);
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

// Re-run filters for all existing articles
app.get('/run-filters', async (req, res) => {
  const logs = [];
  try {
    const ids = await new Promise((resolve, reject) => {
      db.all('SELECT id FROM articles', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(r => r.id));
      });
    });

    await new Promise((resolve, reject) => {
      db.run('DELETE FROM article_filter_matches', err =>
        err ? reject(err) : resolve()
      );
    });
    logs.push('Cleared previous filter matches');

    await runFilters(ids, logs);
    res.json({ processed: ids.length, logs });
  } catch (err) {
    console.error(err);
    logs.push(`Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to run filters', logs });
  }
});

// Get today's articles that matched the M&A filter
app.get('/articles/mna-today', (req, res) => {
  const query = `
    SELECT a.id, a.title, a.description, a.time, a.link,
           ae.body, ae.acquiror, ae.target
    FROM articles a
    JOIN article_filter_matches m ON a.id = m.article_id
    JOIN filters f ON f.id = m.filter_id
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    WHERE date(a.created_at) = date('now') AND f.name = 'M&A'
    ORDER BY a.created_at DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve articles' });
    }
    res.json(rows);
  });
});

// Enrich an article by scraping its body text
app.post('/articles/:id/enrich', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await new Promise((resolve, reject) => {
      db.get('SELECT link FROM articles WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const sources = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM sources', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    let bodySelector = null;
    try {
      const articleHost = new URL(article.link).hostname;
      const src = sources.find(s => {
        try {
          return new URL(s.base_url).hostname === articleHost;
        } catch (e) {
          return false;
        }
      });
      if (src) bodySelector = src.body_selector || null;
    } catch (e) {}

    const response = await axios.get(article.link);
    const $ = cheerio.load(response.data);

    const fallbackSelectors = [
      '#bw-release-story',
      '.bw-release-story',
      '#release-body',
      '[itemprop="articleBody"]',
      '.article-content',
      'article'
    ];

    let container = null;
    if (bodySelector) {
      container = $(bodySelector);
    }
    if (!container || !container.length) {
      for (const sel of fallbackSelectors) {
        const c = $(sel);
        if (c.length) {
          container = c;
          break;
        }
      }
    }
    if (!container || !container.length) {
      container = $('body');
    }

    let text = container
      .find('p, li')
      .map((i, el) => $(el).text().trim())
      .get()
      .join('\n');
    if (!text) {
      text = container.text().trim();
    }

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO article_enrichments (article_id, body)
         VALUES (?, ?)
         ON CONFLICT(article_id) DO UPDATE SET body = excluded.body`,
        [id, text],
        err => (err ? reject(err) : resolve())
      );
    });

    res.json({ success: true, body: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to enrich article' });
  }
});

// Extract acquiror and target using GPT-3.5 from the first sentence
app.post('/articles/:id/extract-parties', async (req, res) => {
  const { id } = req.params;
  try {
    const row = await new Promise((resolve, reject) => {
      db.get(
        `SELECT a.title, e.body FROM articles a JOIN article_enrichments e ON a.id = e.article_id WHERE a.id = ?`,
        [id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });
    if (!row || !row.body) {
      return res.status(404).json({ error: 'Article text not found' });
    }

    const firstSentence = getFirstSentence(row.body);
    const titleAndSentence = `${row.title || ''} ${firstSentence}`.trim();
    const prompt = `Extract the acquiror and target from this text. If none are mentioned, respond with {"acquiror":"N/A","target":"N/A"}. Text: "${titleAndSentence}"`;

    console.log('First sentence:', firstSentence);
    console.log('Prompt:', prompt);

    const resp = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0
    });

    const output = resp.choices[0].message.content.trim();
    console.log('OpenAI output:', output);

    const { acquiror, target } = parseOpenAIResponse(output);
    console.log('Conclusion:', { acquiror, target });

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO article_enrichments (article_id, acquiror, target)
         VALUES (?, ?, ?)
         ON CONFLICT(article_id) DO UPDATE SET acquiror = excluded.acquiror, target = excluded.target`,
        [id, acquiror, target],
        err => (err ? reject(err) : resolve())
      );
    });

    res.json({ success: true, firstSentence, prompt, output, acquiror, target });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract parties' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
