const { getFirstSentence } = require('./extractParties');

function extractDateLocation(body) {
  const first = getFirstSentence(body || '');
  const idx = first.search(/\/CNW|PRNewswire/i);
  if (idx === -1) {
    return { date: '', location: '' };
  }
  const before = first.slice(0, idx).trim().replace(/[-\s]+$/, '');
  const dateRegex = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan\.?|Feb\.?|Mar\.?|Apr\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Sept\.?|Oct\.?|Nov\.?|Dec\.?)\s+\d{1,2},\s+\d{4}/gi;
  const matches = Array.from(before.matchAll(dateRegex));
  const m = matches.length ? matches[matches.length - 1] : null;
  if (!m) {
    return { date: '', location: before.replace(/,[\s]*$/, '') };
  }
  const date = m[0].replace(/\s+/g, ' ').trim();
  let location = before.slice(0, m.index).replace(/,[\s]*$/, '').trim();
  location = location.replace(dateRegex, '').trim();
  location = location.replace(/^[,\s]+/, '').trim();
  location = location.replace(/^\d{1,2}:\d{2}\s*(?:AM|PM)?\s*ET\s*/i, '').trim();
  location = location.replace(/Share this article/i, '').trim();
  location = location.replace(/^[,\s]+/, '').trim();
  return { date, location };
}

module.exports = extractDateLocation;
