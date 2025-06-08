const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const configDb = require('../configDb');
const createPipeline = require('../lib/enrichment/pipeline');
const { getCompleted } = require('../lib/enrichment/steps');
const addLog = require('../lib/addLog');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, configDb, openai);
const VALID_STEPS = ['filters', 'body', 'date', 'parties', 'summary', 'value'];

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
          addLog(logs, `Failed to process article ${id}: ${e.message}`);
        }
      }

    res.json({ processed, logs });
  } catch (err) {
    addLog(null, `Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to run pipeline' });
  }
});

router.get('/run-stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = msg => res.write(`data: ${msg}\n\n`);

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
        await processArticle(id, steps, logs);
        logs.forEach(send);
        logs.length = 0;
        processed++;
        send(`Processed ${processed}/${ids.length}`);
      } catch (e) {
        send(`Failed to process article ${id}: ${e.message}`);
      }
    }

    res.write(`event: done\ndata: ${JSON.stringify({ processed })}\n\n`);
    res.end();
  } catch (err) {
    addLog(null, `Error: ${err.message}`);
    send(`Error: ${err.message}`);
    res.write(`event: done\ndata: ${JSON.stringify({ error: 'Failed to run pipeline' })}\n\n`);
    res.end();
  }
});

module.exports = router;
