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

  const lines = [];
  if (acq) lines.push(`<div class="font-bold">${acq}</div>`);
  if (target) lines.push(`<div class="font-bold">${target}</div>`);
  if (seller && seller !== target) lines.push(`<div class="font-bold">${seller}</div>`);
  if (txType) lines.push(`<div class="text-xs mt-1">${txType}</div>`);

  return `<div class="flex flex-col items-center p-2 border rounded bg-gray-50">${lines.join('')}</div>`;
}
