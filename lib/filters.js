// Filter utilities
async function runFilters(db, articleIds, logs) {
  if (!articleIds.length) return;
  const filters = await db.all('SELECT * FROM filters WHERE active = 1');

  if (!filters.length) {
    logs && logs.push('No active filters to run');
    return;
  }

  for (const id of articleIds) {
    const article = await db.get(
      'SELECT title, description FROM articles WHERE id = ?',
      [id]
    );
    if (!article) continue;

    for (const filter of filters) {
      if (filter.type === 'keyword') {
        const keywords = (filter.value || '')
          .split(',')
          .map(k => k.trim())
          .filter(Boolean);

        const text = `${article.title || ''} ${article.description || ''}`;

        const matched = keywords.some(kw => {
          const regex = new RegExp(
            kw
              .replace(/[.+^${}()|[\]\\]/g, '\\$&')
              .replace(/\*/g, '.*')
              .replace(/\?/g, '.'),
            'i'
          );
          return regex.test(text);
        });

        if (matched) {
          await db.run(
            'INSERT INTO article_filter_matches (article_id, filter_id) VALUES (?, ?)',
            [id, filter.id]
          );
        }
      } else if (filter.type === 'embedding') {
        // Placeholder for future embedding-based filtering. The idea is to
        // compare the article's embedding vector against the filter's stored
        // embedding and store a match when the cosine similarity exceeds a
        // configured threshold.
        //
        // e.g.
        //   const articleVec = JSON.parse(article.embedding);
        //   const filterVec = JSON.parse(filter.value);
        //   if (cosineSimilarity(articleVec, filterVec) > filter.threshold) {
        //     await db.run('INSERT INTO article_filter_matches ...');
        //   }
      }
    }
  }
  logs && logs.push(`Ran ${filters.length} filters on ${articleIds.length} articles`);
}

module.exports = { runFilters };
