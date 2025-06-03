// Filter utilities
async function runFilters(db, articleIds, logs) {
  if (!articleIds.length) return;
  const filters = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM filters WHERE active = 1', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

  if (!filters.length) {
    logs && logs.push('No active filters to run');
    return;
  }

  for (const id of articleIds) {
    const article = await new Promise((resolve, reject) => {
      db.get('SELECT title, description FROM articles WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
    if (!article) continue;

    for (const filter of filters) {
      if (filter.type === 'keyword') {
        const keywords = (filter.value || '')
          .split(',')
          .map(k => k.trim().toLowerCase())
          .filter(Boolean);
        const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
        const matched = keywords.some(kw => text.includes(kw));
        if (matched) {
          await new Promise((resolve, reject) => {
            db.run(
              'INSERT INTO article_filter_matches (article_id, filter_id) VALUES (?, ?)',
              [id, filter.id],
              err => (err ? reject(err) : resolve())
            );
          });
        }
      } else if (filter.type === 'embedding') {
        // TODO: implement semantic filtering using embeddings
      }
    }
  }
  logs && logs.push(`Ran ${filters.length} filters on ${articleIds.length} articles`);
}

module.exports = { runFilters };
