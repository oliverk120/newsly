const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');
const { classifySector } = require('../classifySector');
const { markCompleted, getCompleted } = require('./steps');

const DEFAULT_TEMPLATE = `Summarize the following article in 2-3 sentences and classify the industry. Provide a short note about the acquiror, target and seller and include each party's website URL where available. Respond with JSON {"summary":"...","industry":"...","about_acquiror":"...","about_target":"...","about_seller":"...","acquiror_url":"...","target_url":"...","seller_url":"..."}. Text: "{text}"`;

async function summarizeArticle(articleDb, configDb, openai, id, progress) {
  progress = typeof progress === 'function' ? progress : null;
  const row = await articleDb.get(
    'SELECT body, embedding FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  let embeddingVec = null;
  if (row && row.embedding) {
    try {
      embeddingVec = JSON.parse(row.embedding);
    } catch (e) {
      // ignore parse error
    }
  }
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const { template, fields = ['summary', 'industry', 'about_acquiror', 'about_target', 'about_seller', 'acquiror_url', 'target_url', 'seller_url'] } = await getPrompt(
    configDb,
    'summarizeArticle',
    DEFAULT_TEMPLATE,
    ['summary', 'industry', 'about_acquiror', 'about_target', 'about_seller', 'acquiror_url', 'target_url', 'seller_url']
  );
  const prompt = template.replace('{text}', row.body);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  let summary = '';
  let industry = '';
  let sector = '';
  let aboutAcquiror = '';
  let aboutSeller = '';
  let aboutTarget = '';
  let acquirorUrl = '';
  let sellerUrl = '';
  let targetUrl = '';
  try {
    const parsed = JSON.parse(output);
    if (parsed.summary) summary = parsed.summary;
    if (parsed.industry) industry = parsed.industry;
    aboutAcquiror = parsed.about_acquiror || parsed.aboutAcquiror || '';
    aboutSeller = parsed.about_seller || parsed.aboutSeller || '';
    aboutTarget = parsed.about_target || parsed.aboutTarget || '';
    acquirorUrl = parsed.acquiror_url || parsed.acquirorUrl || '';
    sellerUrl = parsed.seller_url || parsed.sellerUrl || '';
    targetUrl = parsed.target_url || parsed.targetUrl || '';
  } catch (e) {
    // ignore parse errors
  }

  if (embeddingVec) {
    try {
      sector = await classifySector(openai, embeddingVec);
    } catch (e) {
      sector = '';
    }
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (
        article_id, summary, sector, industry,
        about_acquiror, about_seller, about_target,
        acquiror_url, seller_url, target_url
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(article_id) DO UPDATE SET
         summary = excluded.summary,
         sector = excluded.sector,
         industry = excluded.industry,
         about_acquiror = excluded.about_acquiror,
         about_seller = excluded.about_seller,
         about_target = excluded.about_target,
         acquiror_url = excluded.acquiror_url,
         seller_url = excluded.seller_url,
         target_url = excluded.target_url`,
    [
      id,
      summary,
      sector,
      industry,
      aboutAcquiror,
      aboutSeller,
      aboutTarget,
      acquirorUrl,
      sellerUrl,
      targetUrl
    ]
  );

  await appendLog(articleDb, id, `Summarized article with sector "${sector}"`);

  await markCompleted(articleDb, id, 'summary');
  if (progress) await progress(id, 'summary');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return {
    summary,
    sector,
    industry,
    aboutAcquiror,
    aboutSeller,
    aboutTarget,
    acquirorUrl,
    sellerUrl,
    targetUrl,
    prompt,
    output,
    completed: completed.join(',')
  };
}

module.exports = summarizeArticle;
