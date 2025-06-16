const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const configDb = require('../configDb');
const { getCompleted } = require('../lib/enrichment/steps');
const createPipeline = require('../lib/enrichment/pipeline');

const cosineSimilarity = require('../utils/cosineSimilarity');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, configDb, openai);

// Get all articles
router.get('/', async (req, res) => {
  const agg = db.raw && db.raw.getDialect() === 'postgres'
    ? "STRING_AGG(m.filter_id::text, ',')"
    : 'GROUP_CONCAT(m.filter_id)';
  const query = `
    SELECT
      a.id,
      a.title,
      a.description,
      a.time,
      a.link,
      ${agg} as filter_ids
    FROM articles a
    LEFT JOIN article_filter_matches m ON a.id = m.article_id
    GROUP BY a.id
    ORDER BY a.time DESC`;

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
           ae.location, ae.article_date,
           ae.transaction_type, ae.log
    FROM articles a
    JOIN article_filter_matches m ON a.id = m.article_id
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    WHERE m.filter_id IN (${placeholders})
    ORDER BY a.time DESC
    LIMIT 10`;

  try {
    const rows = await db.all(query, ids);
    const articleIds = rows.map(r => r.id);
    if (articleIds.length) {
      const p = articleIds.map(() => '?').join(',');
      const stepRows = await db.all(
        `SELECT article_id, step_name FROM article_enrichment_steps WHERE article_id IN (${p})`,
        articleIds
      );
      const map = {};
      stepRows.forEach(s => {
        (map[s.article_id] = map[s.article_id] || []).push(s.step_name);
      });
      rows.forEach(r => {
        r.completed = (map[r.id] || []).join(',');
      });
    }
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
           ae.about_acquiror, ae.about_seller, ae.about_target,
           ae.acquiror_url, ae.acquiror_location,
           ae.seller_url, ae.seller_location,
           ae.target_url, ae.target_location,
           ae.deal_value, ae.currency, ae.location, ae.article_date,
           ae.transaction_type, ae.embedding, ae.log,
           ae.summary, ae.sector, ae.industry
    FROM articles a
    ${join}
    LEFT JOIN article_enrichments ae ON a.id = ae.article_id
    ORDER BY a.time DESC
    LIMIT ?`;

  try {
    const rows = await db.all(query, [limit]);
    const ids = rows.map(r => r.id);
    const required = ['body', 'embedding', 'date', 'location', 'parties'];
    let stepMap = {};
    if (ids.length) {
      const p = ids.map(() => '?').join(',');
      const stepRows = await db.all(
        `SELECT article_id, step_name FROM article_enrichment_steps WHERE article_id IN (${p})`,
        ids
      );
      stepRows.forEach(s => {
        (stepMap[s.article_id] = stepMap[s.article_id] || []).push(s.step_name);
      });
    }
    const filtered = [];
    rows.forEach(r => {
      const completed = stepMap[r.id] || [];
      if (r.embedding && !completed.includes('embedding')) completed.push('embedding');
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
  const includeAll = req.query.all === '1' || req.query.all === 'true';

  const agg = db.raw && db.raw.getDialect() === 'postgres'
    ? "STRING_AGG(m.filter_id::text, ',')"
    : 'GROUP_CONCAT(m.filter_id)';

  const rows = await db.all(
    `SELECT a.id, a.title, a.description, a.time, a.link,
            ${agg} as filter_ids,
            ae.body, ae.acquiror, ae.seller, ae.target,
            ae.about_acquiror, ae.about_seller, ae.about_target,
            ae.acquiror_url, ae.acquiror_location,
            ae.seller_url, ae.seller_location,
            ae.target_url, ae.target_location,
            ae.deal_value, ae.currency, ae.location, ae.article_date,
            ae.transaction_type, ae.log,
            ae.summary, ae.sector, ae.industry
       FROM articles a
       LEFT JOIN article_filter_matches m ON a.id = m.article_id
       ${includeAll ? 'LEFT JOIN' : 'JOIN'} article_enrichments ae ON a.id = ae.article_id
      ${includeAll ? '' : 'WHERE ae.body IS NOT NULL AND ae.embedding IS NOT NULL'}
      GROUP BY a.id, a.title, a.description, a.time, a.link,
               ae.body, ae.acquiror, ae.seller, ae.target,
               ae.about_acquiror, ae.about_seller, ae.about_target,
               ae.acquiror_url, ae.acquiror_location,
               ae.seller_url, ae.seller_location,
               ae.target_url, ae.target_location,
               ae.deal_value, ae.currency, ae.location, ae.article_date,
               ae.transaction_type, ae.log,
               ae.summary, ae.sector, ae.industry
      ORDER BY a.time DESC`
  );

  const ids = rows.map(r => r.id);
  let stepMap = {};
  if (ids.length) {
    const p = ids.map(() => '?').join(',');
    const stepRows = await db.all(
      `SELECT article_id, step_name FROM article_enrichment_steps WHERE article_id IN (${p})`,
      ids
    );
    stepRows.forEach(s => {
      (stepMap[s.article_id] = stepMap[s.article_id] || []).push(s.step_name);
    });
  }

  const filterRows = await configDb.all('SELECT id, name FROM filters');
  const filterMap = {};
  filterRows.forEach(fr => { filterMap[fr.id] = fr.name; });

  const required = ['body', 'embedding', 'date', 'location', 'parties'];
  let full = 0;
  let partial = 0;
  const articles = [];
  for (const r of rows) {
    r.filter_ids = r.filter_ids
      ? r.filter_ids.split(',').map(id => parseInt(id, 10))
      : [];
    r.filter_names = r.filter_ids.map(id => filterMap[id]).filter(Boolean);

    const completed = stepMap[r.id] || [];
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
    await processArticle(id, ['body', 'date']);
    const row = await db.get(
      'SELECT body, article_date as date, location FROM article_enrichments WHERE article_id = ?',
      [id]
    );
    res.json({ success: true, body: row.body, date: row.date, location: row.location });
  } catch (err) {
    console.error(err);
    const msg = err && err.message ? err.message : 'Failed to enrich article';
    res.status(500).json({ error: msg });
  }
});

// Extract location and date from the first sentence
router.post('/:id/extract-date-location', async (req, res) => {
  const { id } = req.params;
  try {
    await processArticle(id, ['date']);
    const row = await db.get(
      'SELECT article_date as date, location FROM article_enrichments WHERE article_id = ?',
      [id]
    );
    res.json({ success: true, date: row.date, location: row.location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract date/location' });
  }
});

// Extract acquiror, seller and target using GPT-3.5 from the first sentence
router.post('/:id/extract-parties', async (req, res) => {
  const { id } = req.params;
  try {
    await processArticle(id, ['parties']);
    const row = await db.get(
      'SELECT acquiror, seller, target, transaction_type FROM article_enrichments WHERE article_id = ?',
      [id]
    );
    res.json({ success: true, acquiror: row.acquiror, seller: row.seller, target: row.target, transactionType: row.transaction_type });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract parties' });
  }
});

// Summarize article and classify sector/industry using GPT
router.post('/:id/summarize', async (req, res) => {
  const { id } = req.params;
  try {
    await processArticle(id, ['summary']);
    const row = await db.get(
      `SELECT summary, sector, industry,
              about_acquiror, about_seller, about_target,
              acquiror_url, acquiror_location,
              seller_url, seller_location,
              target_url, target_location
         FROM article_enrichments WHERE article_id = ?`,
      [id]
    );
    res.json({
      success: true,
      summary: row.summary,
      sector: row.sector,
      industry: row.industry,
      aboutAcquiror: row.about_acquiror,
      aboutSeller: row.about_seller,
      aboutTarget: row.about_target,
      acquirorUrl: row.acquiror_url,
      acquirorLocation: row.acquiror_location,
      sellerUrl: row.seller_url,
      sellerLocation: row.seller_location,
      targetUrl: row.target_url,
      targetLocation: row.target_location
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize article' });
  }
});

// Extract deal value from the full text and improve location using GPT
router.post('/:id/extract-value-location', async (req, res) => {
  const { id } = req.params;
  try {
    await processArticle(id, ['value']);
    const row = await db.get(
      'SELECT deal_value, currency, location FROM article_enrichments WHERE article_id = ?',
      [id]
    );
    res.json({ success: true, dealValue: row.deal_value, currency: row.currency, location: row.location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract value/location' });
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
        ORDER BY a.time DESC
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
