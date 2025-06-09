const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');
const { markCompleted, getCompleted } = require('./steps');

const DEFAULT_TEMPLATE = `Extract the transaction value in US dollars from the article text if mentioned. If no value is mentioned, respond with "undisclosed". Also review the provided location "{location}" and return a more complete location including country if possible. Respond with JSON {"dealValue":"...","currency":"...","location":"..."}. Text: "{text}"`;

async function extractValueAndLocation(articleDb, configDb, openai, id, progress) {
  progress = typeof progress === 'function' ? progress : null;
  const row = await articleDb.get(
    'SELECT body, location FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const { template, fields = ['deal_value', 'currency', 'location'] } = await getPrompt(
    configDb,
    'extractValueLocation',
    DEFAULT_TEMPLATE,
    ['deal_value', 'currency', 'location']
  );
  const prompt = template
    .replace('{text}', row.body)
    .replace('{location}', row.location || '');

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  let dealValue = 'undisclosed';
  let currency = '';
  let location = row.location || '';
  try {
    const parsed = JSON.parse(output);
    if (parsed.dealValue) dealValue = parsed.dealValue;
    if (parsed.currency) currency = parsed.currency;
    if (parsed.location) location = parsed.location;
  } catch (e) {
    // ignore parse errors
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, deal_value, currency, location)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET deal_value = excluded.deal_value, currency = excluded.currency, location = excluded.location`,
    [id, dealValue, currency, location]
  );

  await appendLog(articleDb, id, `Extracted value "${dealValue}" (${currency}) and location "${location}"`);

  await markCompleted(articleDb, id, 'value');
  if (progress) await progress(id, 'value');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { dealValue, currency, location, prompt, output, completed: completed.join(',') };
}

module.exports = extractValueAndLocation;
