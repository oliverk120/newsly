const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const configDb = require('../configDb');
const fetchAndStoreBody = require('../lib/enrichment/fetchAndStoreBody');
const extractDateLocation = require('../lib/enrichment/extractDateLocation');
const extractParties = require('../lib/enrichment/extractParties');

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

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
      GROUP_CONCAT(m.filter_id) as filter_ids
    FROM articles a
    LEFT JOIN article_filter_matches m ON a.id = m.article_id
    GROUP BY a.id
    ORDER BY a.created_at DESC`;

  try {
    const rows = await db.all(query);
    const filterRows = await configDb.all('SELECT id, name FROM filters');
    const filterMap = {};
    filterRows.forEach(fr => { filterMap[fr.id] = fr.name; });
    rows.forEach(r => {
      r.filter_ids = r.filter_ids
        ? r.filter_ids.split(',').map(id => parseInt(id, 10))
        : [];
      r.filter_names = r.filter_ids.map(id => filterMap[id]).filter(Boolean);
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
  const frows = await configDb.all("SELECT id FROM filters WHERE name = 'M&A'");
  if (!frows.length) return res.json([]);
  const ids = frows.map(r => r.id);
  const placeholders = ids.map(() => '?').join(',');
  const query = `
    SELECT a.id, a.title, a.description, a.time, a.link,
           ae.body, ae.acquiror, ae.seller, ae.target,
           ae.location, ae.article_date, ae.completed,
           ae.transaction_type, ae.log
    FROM articles a
    JOIN article_filter_matches m ON a.id = m.article_id
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    WHERE m.filter_id IN (${placeholders})
    ORDER BY a.created_at DESC
    LIMIT 10`;

  try {
    const rows = await db.all(query, ids);
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
  const excludeFull = req.query.excludeFull === '1' || req.query.excludeFull === 'true';

  const join = matched ? 'INNER JOIN article_filter_matches m ON a.id = m.article_id' : '';

  const query = `
    SELECT DISTINCT a.id, a.title, a.description, a.time, a.link,
           ae.body, ae.acquiror, ae.seller, ae.target,
           ae.location, ae.article_date, ae.completed,
           ae.transaction_type, ae.embedding, ae.log
    FROM articles a
    ${join}
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    ORDER BY a.created_at DESC
    LIMIT ?`;

  try {
    const rows = await db.all(query, [limit]);
    const required = ['body', 'embedding', 'date', 'location', 'parties'];
    const filtered = [];
    rows.forEach(r => {
      const completed = r.completed ? r.completed.split(',') : [];
      if (r.embedding) {
        if (!completed.includes('embedding')) completed.push('embedding');
      }
      const isFull = required.every(k => completed.includes(k));
      r.completed = completed.join(',');
      if (excludeFull && isFull) return;
      filtered.push(r);
    });
    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

// Get enriched articles with stats
router.get('/enriched-list', async (req, res) => {
  const level = req.query.level || 'all';
  const rows = await db.all(
    `SELECT a.id, a.title, a.description, a.time, a.link,
            ae.body, ae.acquiror, ae.seller, ae.target,
            ae.location, ae.article_date, ae.completed,
            ae.transaction_type, ae.log
       FROM articles a
       JOIN article_enrichments ae ON a.id = ae.article_id
      WHERE ae.body IS NOT NULL AND ae.embedding IS NOT NULL
      ORDER BY a.created_at DESC`
  );

  const required = ['body', 'embedding', 'date', 'location', 'parties'];
  let full = 0;
  let partial = 0;
  const articles = [];
  for (const r of rows) {
    const completed = r.completed ? r.completed.split(',') : [];
    const isFull = required.every(k => completed.includes(k));
    if (isFull) full++; else partial++;
    r.completed = completed.join(',');
    if (level === 'full' && !isFull) continue;
    if (level === 'partial' && isFull) continue;
    articles.push(r);
  }

  res.json({ articles, stats: { total: full + partial, full, partial } });
});

// Enrich an article by scraping its body text and extracting date/location
router.post('/:id/enrich', async (req, res) => {
  const { id } = req.params;
  try {
    const bodyRes = await fetchAndStoreBody(db, configDb, openai, id);
    const dateLocRes = await extractDateLocation(db, configDb, id);
    res.json({ success: true, body: bodyRes.body, ...dateLocRes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to enrich article' });
  }
});

// Extract location and date from the first sentence
router.post('/:id/extract-date-location', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await extractDateLocation(db, configDb, id);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract date/location' });
  }
});

// Extract acquiror, seller and target using GPT-3.5 from the first sentence
router.post('/:id/extract-parties', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await extractParties(db, configDb, openai, id);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract parties' });
  }
});

// Summarize article and classify sector/industry using GPT
const summarizeArticle = require('../lib/enrichment/summarizeArticle');
router.post('/:id/summarize', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await summarizeArticle(db, configDb, openai, id);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize article' });
  }
});

// Semantic search using OpenAI embeddings
router.get('/semantic-search', async (req, res) => {
  const query = (req.query.q || '').trim();
  let threshold = parseFloat(req.query.threshold);
  if (isNaN(threshold) || threshold < 0 || threshold > 1) {
    threshold = 0.8;
  }
  if (!query) {
    return res.json({ matches: [], others: [] });
  }

  if (!openai || !openai.embeddings || typeof openai.embeddings.create !== 'function') {
    return res.status(500).json({ error: 'Embedding not configured' });
  }

  let queryVec;
  try {
    const resp = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query
    });
    queryVec = resp.data[0].embedding;
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to embed query' });
  }

  const rows = await db.all(
    `SELECT a.id, a.title, a.description, a.link, ae.embedding
     FROM articles a
     JOIN article_enrichments ae ON a.id = ae.article_id
     WHERE ae.embedding IS NOT NULL`
  );

  const scored = rows.map(r => {
    let vec;
    try {
      vec = JSON.parse(r.embedding);
    } catch (e) {
      vec = null;
    }
    const score = vec ? cosineSimilarity(queryVec, vec) : 0;
    return { id: r.id, title: r.title, description: r.description, link: r.link, score };
  }).sort((a, b) => b.score - a.score);

  const matches = scored.filter(r => r.score >= threshold);
  const others = scored.filter(r => r.score < threshold).slice(0, 2);

  res.json({ matches, others });
});

// Keyword search across title, description and body
router.get('/keyword-search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);

  const pattern = `%${q
    .replace(/([%_\\])/g, '\\$1')
    .replace(/\*/g, '%')
    .replace(/\?/g, '_')}%`;

  try {
    const rows = await db.all(
      `SELECT a.id, a.title, a.description, a.link
         FROM articles a
         LEFT JOIN article_enrichments ae ON a.id = ae.article_id
        WHERE a.title LIKE ? ESCAPE '\\'
           OR a.description LIKE ? ESCAPE '\\'
           OR ae.body LIKE ? ESCAPE '\\'
        ORDER BY a.created_at DESC
        LIMIT 50`,
      [pattern, pattern, pattern]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search articles' });
  }
});



module.exports = router;
