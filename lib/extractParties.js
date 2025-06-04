const { parseTransactionType } = require('./classifyTransaction');

function parseOpenAIResponse(text) {
  let acquiror = 'N/A';
  let seller = 'N/A';
  let target = 'N/A';
  let transactionType = 'Other';
  try {
    const parsed = JSON.parse(text.trim());
    if (parsed.acquiror) acquiror = parsed.acquiror;
    if (parsed.seller) seller = parsed.seller;
    if (parsed.target) target = parsed.target;
    if (parsed.transaction_type || parsed.transactionType) {
      transactionType = parseTransactionType(
        parsed.transaction_type || parsed.transactionType
      );
    }
  } catch (e) {
    // ignore parsing errors
  }
  return { acquiror, seller, target, transactionType };
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

async function extractParties(openai, title, body, template = DEFAULT_TEMPLATE) {
  const firstSentence = getFirstSentence(body);
  const titleAndSentence = `${title || ''} ${firstSentence}`.trim();
  const prompt = template.replace('{text}', titleAndSentence);

  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const output = resp.choices[0].message.content.trim();
  const { acquiror, seller, target, transactionType } = parseOpenAIResponse(output);
  return {
    acquiror,
    seller,
    target,
    transactionType,
    prompt,
    firstSentence,
    output
  };
}

module.exports = {
  parseOpenAIResponse,
  getFirstSentence,
  extractParties,
  DEFAULT_TEMPLATE
};
