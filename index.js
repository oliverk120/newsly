const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Scrape endpoint
app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://www.newswire.ca/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/?page=1&pagesize=100';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const articles = [];
    $('div.col-sm-12.card').each((i, el) => {
      const h3 = $(el).find('h3').first();
      const time = h3.find('small').text().trim();
      h3.find('small').remove();
      const title = h3.text().trim();
      const description = $(el).find('p').text().trim();
      const link = $(el).find('a.newsreleaseconsolidatelink').attr('href') || '';
      const fullLink = link.startsWith('http') ? link : `https://www.newswire.ca${link}`;
      articles.push({ title, description, time, link: fullLink });
    });

    const insertPromises = articles.map(a => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, NULL)',
          [a.title, a.description, a.time, a.link],
          function (err) {
            if (err) return reject(err);
            resolve(this.changes); // 1 if inserted, 0 if ignored
          }
        );
      });
    });

    const results = await Promise.all(insertPromises);
    const inserted = results.reduce((acc, cur) => acc + cur, 0);
    res.json({ inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
