function parseTransactionType(text) {
  if (!text) return 'Other';
  const t = text.trim().toLowerCase();
  if (t.startsWith('m&a')) return 'M&A';
  if (t.startsWith('financing')) return 'Financing';
  return 'Other';
}

const DEFAULT_TEMPLATE =
  'Classify this article as either "M&A", "Financing" or "Other". Respond with one of those words only. Text: "{text}"';

async function classifyTransaction(openai, title, description = '', template = DEFAULT_TEMPLATE) {
  const text = `${title || ''} ${description || ''}`.trim();
  const prompt = template.replace('{text}', text);
  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });
  const output = resp.choices[0].message.content.trim();
  const transactionType = parseTransactionType(output);
  return { transactionType, prompt, output };
}

module.exports = { parseTransactionType, classifyTransaction, DEFAULT_TEMPLATE };
