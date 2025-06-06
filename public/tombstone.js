export function escapeHtml(str) {
  return str.replace(/[&<>]/g, t => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[t]));
}

const countryFlags = {
  'canada': '🇨🇦',
  'united states': '🇺🇸',
  'usa': '🇺🇸',
  'us': '🇺🇸',
  'united kingdom': '🇬🇧',
  'uk': '🇬🇧',
  'germany': '🇩🇪',
  'france': '🇫🇷',
  'spain': '🇪🇸',
  'italy': '🇮🇹',
  'netherlands': '🇳🇱',
  'switzerland': '🇨🇭',
  'australia': '🇦🇺',
  'japan': '🇯🇵',
  'china': '🇨🇳',
  'india': '🇮🇳',
  'brazil': '🇧🇷',
  'mexico': '🇲🇽',
  'dominican republic': '🇩🇴'
};

function flagFromLocation(location) {
  if (!location) return '';
  const parts = location.split(',');
  const country = parts[parts.length - 1].trim().toLowerCase();
  return countryFlags[country] || '';
}

export function createTombstone(article) {
  const acq = article.acquiror && article.acquiror !== 'N/A' ? escapeHtml(article.acquiror) : '';
  const seller = article.seller && article.seller !== 'N/A' ? escapeHtml(article.seller) : '';
  const target = article.target && article.target !== 'N/A' ? escapeHtml(article.target) : '';
  const txTypeRaw = article.transaction_type && article.transaction_type !== 'N/A'
    ? article.transaction_type.trim()
    : '';
  const txType = txTypeRaw ? escapeHtml(txTypeRaw) : '';
  const location = article.location && article.location !== 'N/A' ? escapeHtml(article.location) : '';
  const flag = flagFromLocation(location);

  const bodyLines = [];
  if (txTypeRaw === 'M&A') {
    if (acq) bodyLines.push(`<div class="font-bold text-center">${acq}</div>`);
    if (target || acq) bodyLines.push('<div class="text-center">acquired</div>');
    if (target) bodyLines.push(`<div class="font-bold text-center">${target}</div>`);
    if (seller && seller !== target) {
      bodyLines.push('<div class="text-center">from</div>');
      bodyLines.push(`<div class="font-bold text-center">${seller}</div>`);
    }
  } else if (txTypeRaw === 'Financing') {
    if (seller) bodyLines.push(`<div class="font-bold text-center">${seller}</div>`);
    bodyLines.push('<div class="text-center">raised financing</div>');
    if (acq) {
      bodyLines.push('<div class="text-center">from</div>');
      bodyLines.push(`<div class="font-bold text-center">${acq}</div>`);
    }
  } else {
    if (acq) bodyLines.push(`<div class="font-bold text-center">${acq}</div>`);
    if (target) bodyLines.push(`<div class="font-bold text-center">${target}</div>`);
    if (seller && seller !== target) bodyLines.push(`<div class="font-bold text-center">${seller}</div>`);
  }

  const header = `<div class="bg-gray-200 w-full text-center font-semibold text-xs">${txType || '&nbsp;'}</div>`;
  const footer = location
    ? `<div class="text-xs text-center w-full">${flag ? flag + ' ' : ''}${location}</div>`
    : '<div class="text-xs text-center w-full">&nbsp;</div>';

  return (
    `<div class="flex flex-col justify-between items-center p-2 border rounded bg-gray-50 w-[14.4rem] h-[15rem]">` +
    header +
    `<div class="flex flex-col items-center flex-grow justify-center space-y-1">${bodyLines.join('')}</div>` +
    footer +
    `</div>`
  );
}
