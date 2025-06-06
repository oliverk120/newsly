const axios = require('axios');
const cheerio = require('cheerio');
const extractDateLocation = require('../extractDateLocation');
const appendLog = require('./appendLog');
const { markCompleted, getCompleted } = require('./steps');

async function run(articleDb, configDb, id) {
  const article = await articleDb.get('SELECT link FROM articles WHERE id = ?', [id]);
  if (!article) throw new Error('Article not found');

  const sources = await configDb.all('SELECT * FROM sources');

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

  const row = await articleDb.get(
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
  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, article_date, location)
       VALUES (?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET article_date = excluded.article_date, location = excluded.location`,
    [id, date, location]
  );

  await appendLog(articleDb, id, `Extracted date "${date}" and location "${location}"`);

  if (date) await markCompleted(articleDb, id, 'date');
  if (location) await markCompleted(articleDb, id, 'location');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { date, location, completed: completed.join(',') };
}

module.exports = run;
