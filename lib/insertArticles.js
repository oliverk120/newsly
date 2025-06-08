async function insertArticles(db, articles, isPg) {
  const sql = isPg
    ? 'INSERT INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING'
    : 'INSERT OR IGNORE INTO articles (title, description, time, link, image) VALUES (?, ?, ?, ?, ?)';

  const results = await Promise.all(
    articles.map(async a => {
      const result = await db.run(sql, [a.title, a.description, a.time, a.link, a.image]);
      if (isPg && result.changes > 0) {
        const row = await db.get('SELECT id FROM articles WHERE link = ?', [a.link]);
        result.lastID = row && row.id;
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
