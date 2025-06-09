const { parseTransactionType } = require('./classifyTransaction');

function toCamel(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function parseFields(text, fields) {
  let obj = {};
  try {
    obj = JSON.parse(text.trim());
  } catch (e) {
    obj = {};
  }
  const res = {};
  for (const f of fields) {
    const camel = toCamel(f);
    let val = obj[f];
    if (val === undefined) val = obj[camel];
    if (f === 'transaction_type' && val) val = parseTransactionType(val);
    res[camel] = val;
  }
  return res;
}

function parseOpenAIResponse(text) {
  const parsed = parseFields(text, DEFAULT_FIELDS);
  return {
    acquiror: parsed.acquiror || 'N/A',
    seller: parsed.seller || 'N/A',
    target: parsed.target || 'N/A',
    transactionType: parsed.transactionType || 'Other'
  };
}

function getFirstSentence(text) {
  if (!text) return '';
  const abbreviations = [
    'Inc.',
    'Corp.',
    'Ltd.',
    'Co.',
    'Mr.',
    'Mrs.',
    'Ms.',
    'Dr.',
    'Jr.',
    'Sr.',
    'St.',
    'U.S.',
    'U.K.',
    'EU.',
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.'
  ];

  const words = text.split(/\s+/);
  let sentence = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    sentence += (sentence ? ' ' : '') + word;

    let cleanWord = word.replace(/["']$/, '');
    const endsWithPunct = /[.!?]$/.test(cleanWord);

    if (endsWithPunct) {
      if (!abbreviations.some(a => cleanWord.endsWith(a))) {
        break;
      }
    }
  }

  return sentence.trim();
}

const DEFAULT_TEMPLATE =
  'Extract the acquiror, seller, target and the transaction type ("M&A", "Financing" or "Other"). Anything relating to one party buying, acquiring another is considered "M&A". The target and seller are often the same in an M&A transaction, but the target may also be select assets or a division of the seller. In a financing, the company issuing the financing is the seller. If none are mentioned, respond with JSON {"acquiror":"N/A","seller":"N/A","target":"N/A","transactionType":"Other"}.  Text: "{text}"';

const DEFAULT_FIELDS = ['acquiror', 'seller', 'target', 'transaction_type'];

async function extractParties(
  openai,
  title,
  body,
  template = DEFAULT_TEMPLATE,
  fields = DEFAULT_FIELDS
) {
  const firstSentence = getFirstSentence(body);
  const titleAndSentence = `${title || ''} ${firstSentence}`.trim();
  const prompt = template.replace('{text}', titleAndSentence);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  const parsed = parseFields(output, fields);
  for (const f of fields) {
    const camel = toCamel(f);
    if (['acquiror', 'seller', 'target'].includes(f) && !parsed[camel]) {
      parsed[camel] = 'N/A';
    } else if (f === 'transaction_type') {
      parsed[camel] = parsed[camel] || 'Other';
    } else if (parsed[camel] === undefined) {
      parsed[camel] = '';
    }
  }
  return {
    ...parsed,
    prompt,
    firstSentence,
    output
  };
}

module.exports = {
  parseOpenAIResponse,
  getFirstSentence,
  extractParties,
  DEFAULT_TEMPLATE,
  DEFAULT_FIELDS,
  parseFields,
  toCamel
};
