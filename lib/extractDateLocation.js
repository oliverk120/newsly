const { getFirstSentence } = require('./extractParties');

function extractDateLocation(body) {
  const first = getFirstSentence(body || '');
  const idx = first.search(/\/CNW|PRNewswire/i);
  if (idx === -1) {
    return { date: '', location: '' };
  }
  const before = first.slice(0, idx).trim().replace(/[-\s]+$/, '');
  const dateRegex = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan\.?|Feb\.?|Mar\.?|Apr\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Sept\.?|Oct\.?|Nov\.?|Dec\.?)\s+\d{1,2},\s+\d{4}/i;
  const m = before.match(dateRegex);
  if (!m) {
    return { date: '', location: before.replace(/,[\s]*$/, '') };
  }
  const date = m[0].replace(/\s+/g, ' ').trim();
  const location = before.slice(0, m.index).replace(/,[\s]*$/, '').trim();
  return { date, location };
}

module.exports = extractDateLocation;
