const express = require('express');
const { OpenAI } = require('openai');
const db = require('../db');
const configDb = require('../configDb');
const { runFilters } = require('../lib/filters');
const { scrapeSource } = require('../lib/scraper');
const createPipeline = require('../lib/enrichment/pipeline');
const insertArticles = require('../lib/insertArticles');
const addLog = require('../lib/addLog');
const logger = require('../logger');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const processArticle = createPipeline(db, configDb, openai);
const isPg = db.raw?.getDialect() === 'postgres';

let stopPipeline = false;

// Scrape endpoint
router.get('/scrape', async (req, res) => {
  const logs = [];
  try {
    const sources = await configDb.all('SELECT * FROM sources');
    addLog(logs, `Found ${sources.length} sources`);

    let insertedTotal = 0;
    const details = [];

    for (const source of sources) {
      addLog(logs, `Fetching ${source.base_url}`);
      let articles;
      try {
        articles = await scrapeSource(source);
        addLog(logs, `Loaded ${articles.length} articles from ${source.base_url}`);
      } catch (e) {
        addLog(logs, `Failed to fetch ${source.base_url}: ${e.message}`);
        continue;
      }

      const { inserted, insertedIds } = await insertArticles(db, articles, isPg);
      insertedTotal += inserted;
      addLog(logs, `Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {
        addLog(logs, `New article IDs: ${insertedIds.join(', ')}`);
      }
      if (insertedIds.length) {
        await runFilters(db, configDb, insertedIds, logs);
      }
      details.push({
        source_id: source.id,
        base_url: source.base_url,
        scraped: articles.length,
        inserted,
      });
    }

    addLog(logs, `Inserted total ${insertedTotal} new articles`);
    res.json({ inserted: insertedTotal, details, logs });
  } catch (err) {
    logger.error(err);
    addLog(logs, `Error: ${err.message}`);
    res.status(500).json({ error: 'Scraping failed', logs });
  }
});

// Scrape, filter and enrich newly added matching articles
router.get('/scrape-enrich', async (req, res) => {
  const logs = [];
  try {
    const sources = await configDb.all('SELECT * FROM sources');
    addLog(logs, `Found ${sources.length} sources`);

    let insertedTotal = 0;
    let enrichedTotal = 0;
    const details = [];

    for (const source of sources) {
      addLog(logs, `Fetching ${source.base_url}`);
      let articles;
      try {
        articles = await scrapeSource(source);
        addLog(logs, `Loaded ${articles.length} articles from ${source.base_url}`);
      } catch (e) {
        addLog(logs, `Failed to fetch ${source.base_url}: ${e.message}`);
        continue;
      }

      const { inserted, insertedIds } = await insertArticles(db, articles, isPg);
      insertedTotal += inserted;
      addLog(logs, `Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {
        addLog(logs, `New article IDs: ${insertedIds.join(', ')}`);
      }

      if (insertedIds.length) {
        await runFilters(db, configDb, insertedIds, logs);
        const placeholders = insertedIds.map(() => '?').join(',');
        const rows = await db.all(
          `SELECT DISTINCT article_id FROM article_filter_matches WHERE article_id IN (${placeholders})`,
          insertedIds,
        );
        const matchedIds = rows.map((r) => r.article_id);
        const enrichedIds = [];
        for (const id of matchedIds) {
          try {
            await processArticle(id);
            enrichedTotal++;
            enrichedIds.push(id);
          } catch (e) {
            addLog(logs, `Failed to enrich article ${id}: ${e.message}`);
          }
        }
        if (enrichedIds.length) {
          addLog(logs, `Enriched article ${enrichedIds.join(', ')}`);
        }
      }

      details.push({
        source_id: source.id,
        base_url: source.base_url,
        scraped: articles.length,
        inserted,
      });
    }

    addLog(logs, `Inserted total ${insertedTotal} new articles`);
    addLog(logs, `Enriched total ${enrichedTotal} articles`);
    res.json({
      inserted: insertedTotal,
      enriched: enrichedTotal,
      details,
      logs,
    });
  } catch (err) {
    logger.error(err);
    addLog(logs, `Error: ${err.message}`);
    res.status(500).json({ error: 'Full scrape failed', logs });
  }
});

// Streaming version of the full pipeline using Server-Sent Events
router.get('/scrape-enrich-stream', async (req, res) => {
  stopPipeline = false;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const logs = [];
  const send = (msg) => {
    addLog(null, msg);
    res.write(`data: ${msg}\n\n`);
  };
  const sendStep = (id, step) => {
    res.write(`event: step\ndata: ${JSON.stringify({ id, step })}\n\n`);
  };

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

      const { inserted, insertedIds } = await insertArticles(db, articles, isPg);
      insertedTotal += inserted;
      send(`Inserted ${inserted} new articles from ${source.base_url}`);
      if (insertedIds.length) {
        send(`New article IDs: ${insertedIds.join(', ')}`);
      }

      if (insertedIds.length) {
        await runFilters(db, configDb, insertedIds, logs);
        logs.forEach(send);
        logs.length = 0;

        const placeholders = insertedIds.map(() => '?').join(',');
        const rows = await db.all(
          `SELECT DISTINCT article_id FROM article_filter_matches WHERE article_id IN (${placeholders})`,
          insertedIds,
        );
        const matchedIds = rows.map((r) => r.article_id);

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
        await processArticle(id, undefined, [], sendStep);
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
    logger.error(err);
    send(`Error: ${err.message}`);
    res.write(`event: done\ndata: ${JSON.stringify({ error: 'Full scrape failed' })}\n\n`);
    res.end();
  }
});

router.post('/stop-pipeline', (req, res) => {
  stopPipeline = true;
  res.json({ stopped: true });
});

// Re-run filters for all existing articles
router.get('/run-filters', async (req, res) => {
  const logs = [];
  try {
    const rows = await db.all('SELECT id FROM articles');
    const ids = rows.map((r) => r.id);

    await db.run('DELETE FROM article_filter_matches');
    addLog(logs, 'Cleared previous filter matches');

    await runFilters(db, configDb, ids, logs);
    res.json({ processed: ids.length, logs });
  } catch (err) {
    logger.error(err);
    addLog(logs, `Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to run filters', logs });
  }
});

module.exports = router;
