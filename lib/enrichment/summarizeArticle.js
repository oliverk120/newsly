const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');
const { classifySector } = require('../classifySector');
const { markCompleted, getCompleted } = require('./steps');

const DEFAULT_TEMPLATE = `Summarize the following article in 2-3 sentences and classify the Clairfield sector and industry. Respond with JSON {"summary":"...","sector":"...","industry":"..."}. Text: "{text}"`;

async function summarizeArticle(articleDb, configDb, openai, id) {
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

  const { template, fields = ['summary', 'sector', 'industry'] } = await getPrompt(
    configDb,
    'summarizeArticle',
    DEFAULT_TEMPLATE,
    ['summary', 'sector', 'industry']
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
  try {
    const parsed = JSON.parse(output);
    if (parsed.summary) summary = parsed.summary;
    if (parsed.industry) industry = parsed.industry;
  } catch (e) {
    // ignore parse errors
  }

  if (!sector && embeddingVec) {
    try {
      sector = await classifySector(openai, embeddingVec);
    } catch (e) {
      sector = '';
    }
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, summary, sector, industry)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET summary = excluded.summary, sector = excluded.sector, industry = excluded.industry`,
    [id, summary, sector, industry]
  );

  await appendLog(articleDb, id, `Summarized article with sector "${sector}"`);

  await markCompleted(articleDb, id, 'summary');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { summary, sector, industry, prompt, output, completed: completed.join(',') };
}

module.exports = summarizeArticle;
