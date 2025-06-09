const { runFilters } = require('./filters');
const { scrapeSource } = require('./scraper');
const insertArticles = require('./insertArticles');
const addLog = require('./addLog');

async function scrapeFilterEnrich(db, configDb, processArticle, options = {}) {
  const {
    send,
    sendStep,
    logs = [],
    stop = () => false,
  } = options;

  const isPg = db.raw?.getDialect && db.raw.getDialect() === 'postgres';
  const output = send || ((msg) => addLog(logs, msg));
  const stepCb = sendStep || (() => {});

  const sources = await configDb.all('SELECT * FROM sources');
  output(`Found ${sources.length} sources`);

  let insertedTotal = 0;
  let enrichedTotal = 0;
  const details = [];
  const toEnrich = [];

  for (const source of sources) {
    if (stop()) {
      return { stopped: true, inserted: insertedTotal, enriched: enrichedTotal, details, logs };
    }
    output(`Fetching ${source.base_url}`);
    let articles;
    try {
      articles = await scrapeSource(source);
      output(`Loaded ${articles.length} articles from ${source.base_url}`);
    } catch (e) {
      output(`Failed to fetch ${source.base_url}: ${e.message}`);
      continue;
    }

    const { inserted, insertedIds } = await insertArticles(db, articles, isPg);
    insertedTotal += inserted;
    output(`Inserted ${inserted} new articles from ${source.base_url}`);
    if (insertedIds.length) {
      output(`New article IDs: ${insertedIds.join(', ')}`);
    }

    if (insertedIds.length) {
      await runFilters(db, configDb, insertedIds, logs);
      logs.forEach(output);
      logs.length = 0;

      const placeholders = insertedIds.map(() => '?').join(',');
      const rows = await db.all(
        `SELECT DISTINCT article_id FROM article_filter_matches WHERE article_id IN (${placeholders})`,
        insertedIds,
      );
      const matchedIds = rows.map((r) => r.article_id);
      toEnrich.push(...matchedIds);
    }

    details.push({
      source_id: source.id,
      base_url: source.base_url,
      scraped: articles.length,
      inserted,
    });
  }

  const totalToEnrich = toEnrich.length;
  output(`Inserted total ${insertedTotal} new articles`);
  output(`Enriching ${totalToEnrich} articles`);
  let count = 0;
  for (const id of toEnrich) {
    if (stop()) {
      return { stopped: true, inserted: insertedTotal, enriched: enrichedTotal, details, logs };
    }
    try {
      await processArticle(id, undefined, [], stepCb);
      count++;
      enrichedTotal++;
      output(`Enriched ${count}/${totalToEnrich}`);
    } catch (e) {
      output(`Failed to enrich article ${id}: ${e.message}`);
    }
  }

  output(`Enriched total ${enrichedTotal} articles`);
  return { inserted: insertedTotal, enriched: enrichedTotal, details, logs };
}

module.exports = scrapeFilterEnrich;
