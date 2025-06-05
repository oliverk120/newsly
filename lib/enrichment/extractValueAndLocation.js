const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');

const DEFAULT_TEMPLATE = `Extract the transaction value in US dollars from the article text if mentioned. If no value is mentioned, respond with "undisclosed". Also review the provided location "{location}" and return a more complete location including country if possible. Respond with JSON {"dealValue":"...","location":"..."}. Text: "{text}"`;

async function extractValueAndLocation(articleDb, configDb, openai, id) {
  const row = await articleDb.get(
    'SELECT body, location FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const template = await getPrompt(
    configDb,
    'extractValueLocation',
    DEFAULT_TEMPLATE
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
  let location = row.location || '';
  try {
    const parsed = JSON.parse(output);
    if (parsed.dealValue) dealValue = parsed.dealValue;
    if (parsed.location) location = parsed.location;
  } catch (e) {
    // ignore parse errors
  }

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, deal_value, location)
       VALUES (?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET deal_value = excluded.deal_value, location = excluded.location`,
    [id, dealValue, location]
  );

  await appendLog(articleDb, id, `Extracted value "${dealValue}" and location "${location}"`);

  const row2 = await articleDb.get(
    'SELECT completed FROM article_enrichments WHERE article_id = ?',
    [id]
  );
  const completed = row2 && row2.completed ? row2.completed.split(',') : [];
  if (!completed.includes('value')) completed.push('value');
  await articleDb.run('UPDATE article_enrichments SET completed = ? WHERE article_id = ?', [completed.join(','), id]);

  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return { dealValue, location, prompt, output, completed: completed.join(',') };
}

module.exports = extractValueAndLocation;
