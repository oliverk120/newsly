const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function loadTombstone() {
  const url = pathToFileURL(path.join(__dirname, '../public/tombstone.js')).href;
  return import(url);
}

function createTbody() {
  const rows = [];
  return {
    append(html) { rows.push(html); },
    empty() { rows.length = 0; },
    get rowCount() { return rows.length; },
    get rows() { return rows; }
  };
}

test('renderArticles populates table rows', async () => {
  const { createTombstone, escapeHtml } = await loadTombstone();
  const tbody = createTbody();

  const articles = [
    {
      title: 'First Article',
      link: 'http://example.com/1',
      summary: 'Summary one',
      sector: 'Tech',
      industry: 'Software',
      location: 'USA',
      deal_value: '50M',
      currency: 'USD'
    },
    {
      title: 'Second Article',
      link: 'http://example.com/2',
      summary: 'Summary two',
      sector: 'Health',
      industry: 'Pharma',
      location: 'Germany',
      deal_value: '20M',
      currency: 'EUR'
    }
  ];

  function formatSectorIndustry(a) {
    if (!a.sector && !a.industry) return '';
    const icon = '🏢';
    const sector = a.sector ? escapeHtml(a.sector) : '';
    const industry = a.industry ? escapeHtml(a.industry) : '';
    return `${icon} ${sector}<br>${industry}`;
  }

  function extractCurrency(str) {
    if (!str) return '';
    if (str.includes('$')) return 'USD';
    if (str.includes('€')) return 'EUR';
    if (str.includes('£')) return 'GBP';
    const m = str.match(/\b(USD|EUR|GBP|JPY|CNY|CAD|AUD)\b/i);
    return m ? m[1].toUpperCase() : '';
  }

  function renderArticles() {
    tbody.empty();
    articles.forEach((a, idx) => {
      const tombstone = createTombstone(a);
      const sectorHtml = formatSectorIndustry(a);
      const truncated = a.title.length > 60 ? a.title.slice(0, 60) + '...' : a.title;
      const titleLink = `<a class="text-blue-600 underline" href="${a.link}" target="_blank">${escapeHtml(truncated)}</a>`;
      const summary = `${escapeHtml(a.summary || '')}<br>${titleLink}`;
      const currency = a.currency || extractCurrency(a.deal_value);
      const dealValue = `${a.deal_value || ''}${currency ? ' ' + currency : ''}`;
      const rowHtml =
        `<td class="border px-2 py-1">${idx + 1}</td>` +
        `<td class="border px-2 py-1">${tombstone}</td>` +
        `<td class="border px-2 py-1 w-1/3">${summary}</td>` +
        `<td class="border px-2 py-1">${sectorHtml}</td>` +
        `<td class="border px-2 py-1">${a.location || ''}</td>` +
        `<td class="border px-2 py-1">${dealValue}</td>`;
      tbody.append(rowHtml);
    });
  }

  renderArticles();
  assert.equal(tbody.rowCount, articles.length);
  assert(tbody.rows[0].includes('First Article'));
  assert(tbody.rows[1].includes('Second Article'));
});
