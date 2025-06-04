function parseOpenAIResponse(text) {
  let acquiror = 'N/A';
  let target = 'N/A';
  try {
    const parsed = JSON.parse(text.trim());
    if (parsed.acquiror) acquiror = parsed.acquiror;
    if (parsed.target) target = parsed.target;
  } catch (e) {
    // ignore parsing errors
  }
  return { acquiror, target };
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
  'Extract the acquiror and target from this text. If none are mentioned, respond with {"acquiror":"N/A","target":"N/A"}. Text: "{text}"';

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
  const { acquiror, target } = parseOpenAIResponse(output);
  return { acquiror, target, prompt, firstSentence, output };
}

module.exports = {
  parseOpenAIResponse,
  getFirstSentence,
  extractParties,
  DEFAULT_TEMPLATE
};
