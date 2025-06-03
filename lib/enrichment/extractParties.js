const { parseOpenAIResponse, getFirstSentence } = require('../extractParties');

async function extractParties(db, openai, id) {
  const row = await db.get(
    `SELECT a.title, e.body FROM articles a JOIN article_enrichments e ON a.id = e.article_id WHERE a.id = ?`,
    [id]
  );
  if (!row || !row.body) {
    throw new Error('Article text not found');
  }

  const firstSentence = getFirstSentence(row.body);
  const titleAndSentence = `${row.title || ''} ${firstSentence}`.trim();
  const prompt = `Extract the acquiror and target from this text. If none are mentioned, respond with {"acquiror":"N/A","target":"N/A"}. Text: "${titleAndSentence}"`;

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  const { acquiror, target } = parseOpenAIResponse(output);

  await db.run(
    `INSERT INTO article_enrichments (article_id, acquiror, target)
       VALUES (?, ?, ?)
       ON CONFLICT(article_id) DO UPDATE SET acquiror = excluded.acquiror, target = excluded.target`,
    [id, acquiror, target]
  );

  return { firstSentence, prompt, output, acquiror, target };
}

module.exports = extractParties;
