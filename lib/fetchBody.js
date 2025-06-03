async function fetchHtml(url, http) {
  if (http && typeof http.get === 'function') {
    const resp = await http.get(url);
    return resp.data;
  }
  if (typeof fetch === 'function') {
    const resp = await fetch(url);
    return await resp.text();
  }
  throw new Error('No HTTP client available');
}

function stripTags(text) {
  return text.replace(/<[^>]+>/g, '');
}

function extractSection(html, selector) {
  if (!selector) return html;
  if (selector.startsWith('#')) {
    const id = selector.slice(1);
    const regex = new RegExp(`<[^>]*id=["']${id}["'][^>]*>([\s\S]*?)</[^>]+>`);
    const m = html.match(regex);
    return m ? m[1] : html;
  }
  if (selector.startsWith('.')) {
    const cls = selector.slice(1);
    const regex = new RegExp(`<[^>]*class=["'][^"']*${cls}[^"']*["'][^>]*>([\s\S]*?)</[^>]+>`);
    const m = html.match(regex);
    return m ? m[1] : html;
  }
  const regex = new RegExp(`<${selector}[^>]*>([\s\S]*?)</${selector}>`);
  const m = html.match(regex);
  return m ? m[1] : html;
}

function extractParagraphs(html) {
  const matches = [...html.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/g)];
  const parts = matches
    .map(m => stripTags(m[2]).trim())
    .filter(t => t.length > 0);
  if (parts.length) return parts.join('\n');
  return stripTags(html).trim();
}

async function fetchBody(url, bodySelector = null, http) {
  const html = await fetchHtml(url, http);

  const fallbackSelectors = [
    '#bw-release-story',
    '.bw-release-story',
    '#release-body',
    '[itemprop="articleBody"]',
    '.article-content',
    'article'
  ];

  let section = extractSection(html, bodySelector);
  if (section === html) {
    for (const sel of fallbackSelectors) {
      const sec = extractSection(html, sel);
      if (sec !== html) {
        section = sec;
        break;
      }
    }
  }

  return extractParagraphs(section);
}

module.exports = fetchBody;
