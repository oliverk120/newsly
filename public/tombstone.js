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
  'dominican republic': '🇩🇴'
};

function flagFromLocation(location) {
  if (!location) return '';
  const parts = location.split(',');
  const country = parts[parts.length - 1].trim().toLowerCase();
  return countryFlags[country] || '';
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
  const tLoc = article.target_location || article.targetLocation || '';
  const aLoc = article.acquiror_location || article.acquirorLocation || '';
  let location = '';
  if (tLoc && aLoc) {
    location = `${escapeHtml(tLoc)} / ${escapeHtml(aLoc)}`;
  } else if (tLoc) {
    location = escapeHtml(tLoc);
  } else if (aLoc) {
    location = escapeHtml(aLoc);
  } else if (article.location && article.location !== 'N/A') {
    location = escapeHtml(article.location);
  }
  const flag = flagFromLocation(location);

  const bodyLines = [];
  if (txTypeRaw === 'M&A') {
    if (acq) {
      const title = aboutAcq ? ` title="${escapeAttr(aboutAcq)}"` : '';
      bodyLines.push(`<div class="font-bold text-center"${title}>${acq}</div>`);
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
