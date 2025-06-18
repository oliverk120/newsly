const logger = require('../logger');

async function insertArticles(db, articles, isPg) {
  const sql = isPg
    ? 'INSERT INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING'
    : 'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?)';

  const results = await Promise.all(
    articles.map(async a => {
      const result = await db.run(sql, [a.title, a.description, a.time, a.link, a.image]);
      if (process.env.DEBUG) {
        logger.debug(`Insert result for ${a.link || a.title}: ${JSON.stringify(result)}`);
      }
      if (isPg) {
        const row = await db.get('SELECT id FROM articles WHERE link = ?', [a.link]);
        if (row) {
          result.lastID = row.id;
          if (typeof result.changes !== 'number') {
            result.changes = 1;
            if (process.env.DEBUG) {
              logger.debug(`Row found for ${a.link || a.title} despite missing row count`);
            }
          }
        }
      }
      return result;
    })
  );

  const inserted = results.reduce((acc, cur) => acc + cur.changes, 0);
  const insertedIds = results
    .filter(r => r.changes > 0 && typeof r.lastID !== 'undefined')
    .map(r => r.lastID);

  return { inserted, insertedIds };
}

module.exports = insertArticles;
