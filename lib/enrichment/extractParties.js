const {
  getFirstSentence,
  DEFAULT_TEMPLATE,
  DEFAULT_FIELDS,
  parseFields,
  toCamel
} = require('../extractParties');
const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');
const { markCompleted, getCompleted } = require('./steps');

async function extractParties(articleDb, configDb, openai, id, progress) {
  progress = typeof progress === 'function' ? progress : null;
  const row = await articleDb.get(
    `SELECT a.title, e.body FROM articles a JOIN article_enrichments e ON a.id = e.article_id WHERE a.id = ?`,
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const firstSentence = getFirstSentence(row.body);
  const titleAndSentence = `${row.title || ''} ${firstSentence}`.trim();
  const { template, fields = DEFAULT_FIELDS } = await getPrompt(
    configDb,
    'extractParties',
    DEFAULT_TEMPLATE,
    DEFAULT_FIELDS
  );
  const prompt = template.replace('{text}', titleAndSentence);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  const parsed = parseFields(output, fields);
  const dbVals = {};
  for (const f of fields) {
    const camel = toCamel(f);
    let val = parsed[camel];
    if (['acquiror', 'seller', 'target'].includes(f)) {
      val = val || 'N/A';
    } else if (f === 'transaction_type') {
      val = val || 'Other';
    } else if (val === undefined) {
      val = '';
    }
    dbVals[f] = val;
  }

  const columns = Object.keys(dbVals).join(', ');
  const placeholders = Object.keys(dbVals).map(() => '?').join(', ');
  const updates = Object.keys(dbVals)
    .map(c => `${c} = excluded.${c}`)
    .join(', ');
  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, ${columns})
       VALUES (?, ${placeholders})
       ON CONFLICT(article_id) DO UPDATE SET ${updates}`,
    [id, ...Object.values(dbVals)]
  );

  await appendLog(
    articleDb,
    id,
    `Extracted parties ${fields.map(f => `${f}:${dbVals[f]}`).join(' ')}`
  );

  await markCompleted(articleDb, id, 'parties');
  if (progress) await progress(id, 'parties');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return {
    firstSentence,
    prompt,
    output,
    ...Object.fromEntries(
      Object.entries(dbVals).map(([k, v]) => [toCamel(k), v])
    ),
    completed: completed.join(',')
  };
}

module.exports = extractParties;
