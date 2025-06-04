const axios = require('axios');
const cheerio = require('cheerio');
const extractDateLocation = require('../extractDateLocation');

async function run(db, id) {
  const article = await db.get('SELECT link FROM articles WHERE id = ?', [id]);
  if (!article) throw new Error('Article not found');

  const sources = await db.all('SELECT * FROM sources');

  let dateSelector = null;
  let locationSelector = null;
  try {
    const host = new URL(article.link).hostname;
    const src = sources.find(s => {
      try {
        return new URL(s.base_url).hostname === host;
      } catch (e) {
        return false;
      }
    });
    if (src) {
      dateSelector = src.date_selector || null;
      locationSelector = src.location_selector || null;
    }
  } catch (e) {}

  let date = '';
  let location = '';

  if (dateSelector || locationSelector) {
    try {
      const resp = await axios.get(article.link);
      const $ = cheerio.load(resp.data);
      if (dateSelector) {
        date = $(dateSelector).first().text().trim();
      }
      if (locationSelector) {
        location = $(locationSelector).first().text().trim();
      }
    } catch (e) {}
  }

  const row = await db.get(
    'SELECT body FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }
  if (!date || !location) {
    const fallback = extractDateLocation(row.body);
    if (!date) date = fallback.date;
    if (!location) location = fallback.location;
  }
  await db.run(
    `INSERT INTO article_enrichments (article_id, article_date, location)
       VALUES (?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET article_date = excluded.article_date, location = excluded.location`,
    [id, date, location]
  );

  const row2 = await db.get(
    'SELECT completed FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  const completed = row2 && row2.completed ? row2.completed.split(',') : [];
  if (date && !completed.includes('date')) completed.push('date');
  if (location && !completed.includes('location')) completed.push('location');
  await db.run(
    'UPDATE article_enrichments SET completed = ? WHERE article_id = ?',
    [completed.join(','), id]
  );

  return { date, location, completed: completed.join(',') };
}

module.exports = run;
