const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { OpenAI } = require('openai');
const db = require('../db');
const { parseOpenAIResponse, getFirstSentence } = require('../lib/extractParties');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get all articles
router.get('/', (req, res) => {
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

// Get today's articles that matched the M&A filter
router.get('/mna-today', (req, res) => {
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
router.post('/:id/enrich', async (req, res) => {
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
router.post('/:id/extract-parties', async (req, res) => {
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

module.exports = router;
