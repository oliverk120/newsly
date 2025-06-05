async function appendLog(db, id, message) {
  const row = await db.get('SELECT log FROM article_enrichments WHERE article_id = ?', [id]);
  const ts = new Date().toISOString();
  const prev = row && row.log ? row.log + '\n' : '';
  const log = `${prev}${ts} ${message}`;
  await db.run(
    `INSERT INTO article_enrichments (article_id, log)
     VALUES (?, ?)
     ON CONFLICT(article_id) DO UPDATE SET log = excluded.log`,
    [id, log]
  );
}

module.exports = appendLog;
