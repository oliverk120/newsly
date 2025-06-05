export function escapeHtml(str) {
  return str.replace(/[&<>]/g, t => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[t]));
}

export function createTombstone(article) {
  const acq = article.acquiror && article.acquiror !== 'N/A' ? escapeHtml(article.acquiror) : '';
  const seller = article.seller && article.seller !== 'N/A' ? escapeHtml(article.seller) : '';
  const target = article.target && article.target !== 'N/A' ? escapeHtml(article.target) : '';
  const txType = article.transaction_type && article.transaction_type !== 'N/A'
    ? escapeHtml(article.transaction_type)
    : '';
  const location = article.location && article.location !== 'N/A' ? escapeHtml(article.location) : '';

  const bodyLines = [];
  if (txType === 'M&A') {
    if (acq) bodyLines.push(`<div class="font-bold text-center">${acq}</div>`);
    if (target || acq) bodyLines.push('<div class="text-center">acquired</div>');
    if (target) bodyLines.push(`<div class="font-bold text-center">${target}</div>`);
    if (seller && seller !== target) {
      bodyLines.push('<div class="text-center">from</div>');
      bodyLines.push(`<div class="font-bold text-center">${seller}</div>`);
    }
  } else if (txType === 'Financing') {
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
  const footer = location ? `<div class="text-xs text-center w-full">${location}</div>` : '<div class="text-xs text-center w-full">&nbsp;</div>';

  return (
    `<div class="flex flex-col justify-between items-center p-2 border rounded bg-gray-50 w-48 h-40">` +
    header +
    `<div class="flex flex-col items-center flex-grow justify-center space-y-1">${bodyLines.join('')}</div>` +
    footer +
    `</div>`
  );
}
