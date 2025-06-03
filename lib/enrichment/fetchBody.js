const axios = require('axios');
const cheerio = require('cheerio');

async function fetchBody(db, id) {
  const article = await new Promise((resolve, reject) => {
    db.get('SELECT link FROM articles WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  if (!article) throw new Error('Article not found');

  const sources = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM sources', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

  let bodySelector = null;
  try {
    const articleHost = new URL(article.link).hostname;
    const src = sources.find(s => {
      try {
        return new URL(s.base_url).hostname === articleHost;
      } catch (e) {
        return false;
      }
    });
    if (src) bodySelector = src.body_selector || null;
  } catch (e) {}

  const response = await axios.get(article.link);
  const $ = cheerio.load(response.data);

  const fallbackSelectors = [
    '#bw-release-story',
    '.bw-release-story',
    '#release-body',
    '[itemprop="articleBody"]',
    '.article-content',
    'article'
  ];

  let container = null;
  if (bodySelector) {
    container = $(bodySelector);
  }
  if (!container || !container.length) {
    for (const sel of fallbackSelectors) {
      const c = $(sel);
      if (c.length) {
        container = c;
        break;
      }
    }
  }
  if (!container || !container.length) {
    container = $('body');
  }

  let text = container
    .find('p, li')
    .map((i, el) => $(el).text().trim())
    .get()
    .join('\n');
  if (!text) {
    text = container.text().trim();
  }

  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO article_enrichments (article_id, body)
       VALUES (?, ?)
       ON CONFLICT(article_id) DO UPDATE SET body = excluded.body`,
      [id, text],
      err => (err ? reject(err) : resolve())
    );
  });

  return text;
}

module.exports = fetchBody;
