const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const configDb = require('../configDb');
const createPipeline = require('../lib/enrichment/pipeline');
const { getCompleted } = require('../lib/enrichment/steps');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, configDb, openai);
const VALID_STEPS = ['body', 'date', 'parties', 'summary', 'value'];

router.get('/run', async (req, res) => {
  try {
    let steps = (req.query.steps || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    steps = steps.filter(s => VALID_STEPS.includes(s));
    if (!steps.length) steps = VALID_STEPS;

    let ids = [];
    if (req.query.ids) {
      ids = req.query.ids
        .split(',')
        .map(id => parseInt(id, 10))
        .filter(id => !isNaN(id));
    } else if (req.query.since) {
      const rows = await db.all(
        'SELECT id FROM articles WHERE created_at >= ?',
        [req.query.since]
      );
      ids = rows.map(r => r.id);
    } else {
      const rows = await db.all('SELECT id FROM articles');
      ids = rows.map(r => r.id);
    }

    const incompleteOnly =
      req.query.incomplete === '1' || req.query.incomplete === 'true';

    let processed = 0;
    const logs = [];

    for (const id of ids) {
      if (incompleteOnly) {
        const completed = await getCompleted(db, id);
        const missing = steps.filter(s => !completed.includes(s));
        if (!missing.length) continue;
      }
      try {
        await processArticle(id, steps);
        processed++;
      } catch (e) {
        logs.push(`Failed to process article ${id}: ${e.message}`);
      }
    }

    res.json({ processed, logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to run pipeline' });
  }
});

module.exports = router;
