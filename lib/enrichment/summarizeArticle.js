const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');

const DEFAULT_TEMPLATE = `Summarize the following article in 2-3 sentences and classify the Clairfield sector and industry. Respond with JSON {"summary":"...","sector":"...","industry":"..."}. Text: "{text}"`;

async function summarizeArticle(articleDb, configDb, openai, id) {
  const row = await articleDb.get(
    'SELECT body FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const template = await getPrompt(
    configDb,
    'summarizeArticle',
    DEFAULT_TEMPLATE
  );
  const prompt = template.replace('{text}', row.body);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  let summary = '';
  let sector = '';
  let industry = '';
  try {
    const parsed = JSON.parse(output);
    if (parsed.summary) summary = parsed.summary;
    if (parsed.sector) sector = parsed.sector;
    if (parsed.clairfield_sector && !sector) sector = parsed.clairfield_sector;
    if (parsed.industry) industry = parsed.industry;
  } catch (e) {
    // ignore parse errors
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, summary, sector, industry)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET summary = excluded.summary, sector = excluded.sector, industry = excluded.industry`,
    [id, summary, sector, industry]
  );

  await appendLog(articleDb, id, `Summarized article with sector "${sector}"`);

  const row2 = await articleDb.get(
    'SELECT completed FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  const completed = row2 && row2.completed ? row2.completed.split(',') : [];
  if (!completed.includes('summary')) completed.push('summary');
  await articleDb.run(
    'UPDATE article_enrichments SET completed = ? WHERE article_id = ?',
    [completed.join(','), id]
  );

  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { summary, sector, industry, prompt, output, completed: completed.join(',') };
}

module.exports = summarizeArticle;
