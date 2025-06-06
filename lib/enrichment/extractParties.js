const {
  parseOpenAIResponse,
  getFirstSentence,
  DEFAULT_TEMPLATE
} = require('../extractParties');
const { getPrompt } = require('../prompts');
const appendLog = require('./appendLog');
const { markCompleted, getCompleted } = require('./steps');

async function extractParties(articleDb, configDb, openai, id) {
  const row = await articleDb.get(
    `SELECT a.title, e.body FROM articles a JOIN article_enrichments e ON a.id = e.article_id WHERE a.id = ?`,
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const firstSentence = getFirstSentence(row.body);
  const titleAndSentence = `${row.title || ''} ${firstSentence}`.trim();
  const template = await getPrompt(configDb, 'extractParties', DEFAULT_TEMPLATE);
  const prompt = template.replace('{text}', titleAndSentence);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  const { acquiror, seller, target, transactionType } = parseOpenAIResponse(output);

  await articleDb.run(
    `INSERT INTO article_enrichments (article_id, acquiror, seller, target, transaction_type)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET acquiror = excluded.acquiror, seller = excluded.seller, target = excluded.target, transaction_type = excluded.transaction_type`,
    [id, acquiror, seller, target, transactionType]
  );

  await appendLog(articleDb, id, `Extracted parties a:${acquiror} s:${seller} t:${target} type:${transactionType}`);

  await markCompleted(articleDb, id, 'parties');
  const completed = await getCompleted(articleDb, id);
  await appendLog(articleDb, id, `Updated completed steps: ${completed.join(',')}`);

  return {
    firstSentence,
    prompt,
    output,
    acquiror,
    seller,
    target,
    transactionType,
    completed: completed.join(',')
  };
}

module.exports = extractParties;
