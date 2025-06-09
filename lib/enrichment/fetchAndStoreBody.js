const axios = require('axios');
const cheerio = require('cheerio');
const appendLog = require('./appendLog');
const { markCompleted, getCompleted } = require('./steps');

async function fetchAndStoreBody(articleDb, configDb, openai, id, progress) {
  progress = typeof progress === 'function' ? progress : null;
  const article = await articleDb.get('SELECT link FROM articles WHERE id = ?', [id]);
  if (!article) throw new Error('Article not found');
  if (!article.link) throw new Error('Article link missing');

  const sources = await configDb.all('SELECT * FROM sources');

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

  let response;
  try {
    response = await axios.get(article.link);
  } catch (err) {
    await appendLog(articleDb, id, `Failed to fetch article: ${err.message}`);
    throw new Error('Failed to fetch article');
  }
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
  if (!text) {
    await appendLog(articleDb, id, 'No body text found');
    throw new Error('Article text not found');
  }

  let embeddingJson = null;
  if (openai && openai.embeddings && typeof openai.embeddings.create === 'function') {
    try {
      const resp = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text
      });
      if (resp && resp.data && resp.data[0] && resp.data[0].embedding) {
        embeddingJson = JSON.stringify(resp.data[0].embedding);
      }
    } catch (e) {
      // ignore embedding errors
    }
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, body, embedding)
       VALUES (?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET body = excluded.body, embedding = COALESCE(excluded.embedding, article_enrichments.embedding)`,
    [id, text, embeddingJson]
  );

  await appendLog(articleDb, id, `Fetched body text (${text.length} chars)`);
  if (embeddingJson) {
    await appendLog(articleDb, id, 'Generated embedding');
  }

  const row = await articleDb.get(
    'SELECT embedding FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  await markCompleted(articleDb, id, 'body');
  if (typeof progress === 'function') await progress(id, 'body');
  if (embeddingJson || row.embedding) {
    await markCompleted(articleDb, id, 'embedding');
    if (typeof progress === 'function') await progress(id, 'embedding');
  }

  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { body: text, completed: completed.join(',') };
}

module.exports = fetchAndStoreBody;
