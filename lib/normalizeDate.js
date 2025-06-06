function normalizeDate(str, scrapedAt) {
  if (!str) return '';
  const tzRemoved = str.replace(/\b(?:ET|EST|EDT|CT|CST|CDT|PT|PST|PDT|GMT|UTC)\b/gi, '').trim();
  let d = new Date(tzRemoved);
  if (!isNaN(d)) {
    return d.toISOString();
  }
  const timeMatch = tzRemoved.match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
  if (timeMatch) {
    const base = scrapedAt ? new Date(scrapedAt) : new Date();
    if (isNaN(base)) return '';
    let hour = parseInt(timeMatch[1], 10);
    const minute = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3] ? timeMatch[3].toUpperCase() : '';
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    base.setHours(hour, minute, 0, 0);
    return base.toISOString();
  }
  return '';
}

module.exports = normalizeDate;
