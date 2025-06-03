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

module.exports = { parseOpenAIResponse, getFirstSentence };
