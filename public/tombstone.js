export function escapeHtml(str) {
  return str.replace(/[&<>]/g, t => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[t]));
}

export function escapeAttr(str) {
  return str.replace(/[&<>"']/g, t => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[t]));
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
  'dominican republic': '🇩🇴',
  'russia': '🇷🇺',
  'south korea': '🇰🇷',
  'korea': '🇰🇷',
  'sweden': '🇸🇪',
  'norway': '🇳🇴',
  'denmark': '🇩🇰',
  'finland': '🇫🇮',
  'belgium': '🇧🇪',
  'austria': '🇦🇹',
  'ireland': '🇮🇪',
  'portugal': '🇵🇹',
  'poland': '🇵🇱',
  'turkey': '🇹🇷',
  'saudi arabia': '🇸🇦',
  'united arab emirates': '🇦🇪',
  'uae': '🇦🇪',
  'south africa': '🇿🇦',
  'new zealand': '🇳🇿',
  'argentina': '🇦🇷',
  'singapore': '🇸🇬',
  'hong kong': '🇭🇰',
  'israel': '🇮🇱'
};

export const acquirorTypeIcons = {
  'private equity firm': '👔',
  'other financial buyer': '💰',
  lender: '🏦',
  'strategic buyer': '🏭'
};

function flagFromLocation(location) {
  if (!location) return '';
  const parts = location.split(',');
  const country = parts[parts.length - 1].trim().toLowerCase();
  return countryFlags[country] || '';
}

function extractCountry(location) {
  if (!location) return '';
  const parts = location.split(',');
  return parts[parts.length - 1].trim();
}

function formatParty(name, url) {
  const text = name && name !== 'N/A' ? escapeHtml(name) : '';
  if (!text) return '';
  const validUrl = url && /^https?:\/\//i.test(url);
  return validUrl
    ? `<a class="text-blue-600 underline" href="${escapeAttr(url)}" target="_blank">${text}</a>`
    : text;
}

export function createTombstone(article) {
  const acq = formatParty(
    article.acquiror,
    article.acquiror_url || article.acquirorUrl
  );
  const seller = formatParty(
    article.seller,
    article.seller_url || article.sellerUrl
  );
  const target = formatParty(
    article.target,
    article.target_url || article.targetUrl
  );
  const aboutAcq = article.about_acquiror || article.aboutAcquiror || '';
  const aboutSeller = article.about_seller || article.aboutSeller || '';
  const aboutTarget = article.about_target || article.aboutTarget || '';
  const txTypeRaw = article.transaction_type && article.transaction_type !== 'N/A'
    ? article.transaction_type.trim()
    : '';
  const txType = txTypeRaw ? escapeHtml(txTypeRaw) : '';
  const acqTypeRaw =
    article.acquiror_type || article.acquirorType || '';
  const acqType =
    acqTypeRaw && acqTypeRaw !== 'N/A' ? escapeHtml(acqTypeRaw) : '';
  const tLocFull = article.target_location || article.targetLocation || '';
  const aLocFull = article.acquiror_location || article.acquirorLocation || '';
  const tLoc = extractCountry(tLocFull);
  const aLoc = extractCountry(aLocFull);

  const bodyLines = [];
  if (txTypeRaw === 'M&A') {
    if (acq) {
      const title = aboutAcq ? ` title="${escapeAttr(aboutAcq)}"` : '';
      bodyLines.push(
        `<div class="font-bold text-center"${title}>${acq}</div>`
      );
    }
    if (target || acq) bodyLines.push('<div class="text-center">acquired</div>');
    if (target) {
      const title = aboutTarget ? ` title="${escapeAttr(aboutTarget)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${target}</div>`);
    }
    if (seller && seller !== target) {
      bodyLines.push('<div class="text-center">from</div>');
      const title = aboutSeller ? ` title="${escapeAttr(aboutSeller)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${seller}</div>`);
    }
  } else if (txTypeRaw === 'Financing') {
    if (seller) {
      const title = aboutSeller ? ` title="${escapeAttr(aboutSeller)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${seller}</div>`);
    }
    bodyLines.push('<div class="text-center">raised financing</div>');
    if (acq) {
      bodyLines.push('<div class="text-center">from</div>');
      const title = aboutAcq ? ` title="${escapeAttr(aboutAcq)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${acq}</div>`);
    }
  } else {
    if (acq) {
      const title = aboutAcq ? ` title="${escapeAttr(aboutAcq)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${acq}</div>`);
    }
    if (target) {
      const title = aboutTarget ? ` title="${escapeAttr(aboutTarget)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${target}</div>`);
    }
    if (seller && seller !== target) {
      const title = aboutSeller ? ` title="${escapeAttr(aboutSeller)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${seller}</div>`);
    }
  }

  const headerParts = [];
  if (txType) headerParts.push(`<span class="font-semibold">${txType}</span>`);
  if (acqType) headerParts.push(`<span>${acqType}</span>`);
  const headerLabel = headerParts.join(' - ') || '&nbsp;';
  const header =
    `<div class="w-full text-center text-sm text-white" style="background-color: rgb(0,44,80); padding-top:5px; padding-bottom:5px;">` +
    `${headerLabel}` +
    `</div>`;
  const footer = '<div class="text-xs text-center w-full">&nbsp;</div>';

  return (
    `<div class="flex flex-col justify-between items-center p-2 border rounded bg-gray-50 w-[14.4rem] h-[15rem]" style="border-color: rgb(0,44,80)">` +
    header +
    `<div class="flex flex-col items-center flex-grow justify-center space-y-1">${bodyLines.join('')}</div>` +
    footer +
    `</div>`
  );
}
