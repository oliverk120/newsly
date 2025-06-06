async function markCompleted(db, id, step) {
  const row = await db.get(
    'SELECT 1 FROM article_enrichment_steps WHERE article_id = ? AND step_name = ?',
    [id, step]
  );
  if (!row) {
    await db.run(
      'INSERT INTO article_enrichment_steps (article_id, step_name) VALUES (?, ?)',
      [id, step]
    );
  }
}

async function getCompleted(db, id) {
  const rows = await db.all(
    'SELECT step_name FROM article_enrichment_steps WHERE article_id = ?',
    [id]
  );
  return rows.map(r => r.step_name);
}

module.exports = { markCompleted, getCompleted };
