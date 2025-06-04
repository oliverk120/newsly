const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const fetchBody = require('../lib/enrichment/fetchBody');
const extractParties = require('../lib/enrichment/extractParties');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get all articles
router.get('/', async (req, res) => {
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

  try {
    const rows = await db.all(query);
    rows.forEach(r => {
      r.filter_ids = r.filter_ids
        ? r.filter_ids.split(',').map(id => parseInt(id, 10))
        : [];
      r.filter_names = r.filter_names ? r.filter_names.split(',') : [];
      r.matched = r.filter_ids.length > 0;
    });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

// Get the most recent M&A articles
router.get('/mna-today', async (req, res) => {
  const query = `
    SELECT a.id, a.title, a.description, a.time, a.link,
           ae.body, ae.acquiror, ae.target
    FROM articles a
    JOIN article_filter_matches m ON a.id = m.article_id
    JOIN filters f ON f.id = m.filter_id
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    WHERE f.name = 'M&A'
    ORDER BY a.created_at DESC
    LIMIT 10`;

  try {
    const rows = await db.all(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

// Get articles for enrichment with optional filtering
router.get('/enrich-list', async (req, res) => {
  let limit = parseInt(req.query.limit, 10);
  if (![25, 50, 75, 100].includes(limit)) {
    limit = 25;
  }
  const matched = req.query.matched === '1' || req.query.matched === 'true';

  const join = matched ? 'INNER JOIN article_filter_matches m ON a.id = m.article_id' : '';

  const query = `
    SELECT DISTINCT a.id, a.title, a.description, a.time, a.link,
           ae.body, ae.acquiror, ae.target
    FROM articles a
    ${join}
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    ORDER BY a.created_at DESC
    LIMIT ?`;

  try {
    const rows = await db.all(query, [limit]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

// Enrich an article by scraping its body text
router.post('/:id/enrich', async (req, res) => {
  const { id } = req.params;
  try {
    const text = await fetchBody(db, id);
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
    const result = await extractParties(db, openai, id);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract parties' });
  }
});

module.exports = router;
