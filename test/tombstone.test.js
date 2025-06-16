const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function loadModule() {
  const url = pathToFileURL(path.join(__dirname, '../public/tombstone.js')).href;
  return import(url);
}

test('adds links when URLs provided', async () => {
  const { createTombstone } = await loadModule();
  const article = {
    acquiror: 'Acme',
    seller: 'SellerCo',
    target: 'Target',
    acquiror_url: 'http://acme.com',
    seller_url: 'http://seller.com',
    target_url: 'http://target.com',
    transaction_type: 'M&A'
  };
  const html = createTombstone(article);
  assert(html.includes('http://acme.com'));
  assert(html.includes('http://seller.com'));
  assert(html.includes('http://target.com'));
});

test('omits links when URLs missing', async () => {
  const { createTombstone } = await loadModule();
  const article = {
    acquiror: 'Acme',
    seller: 'SellerCo',
    target: 'Target',
    transaction_type: 'M&A'
  };
  const html = createTombstone(article);
  assert(!html.includes('<a'));
});

test('uses target and acquiror locations when available', async () => {
  const { createTombstone } = await loadModule();
  const article = {
    acquiror: 'Acme',
    seller: 'SellerCo',
    target: 'Target',
    acquiror_location: 'USA',
    target_location: 'Canada',
    location: 'France',
    transaction_type: 'M&A'
  };
  const html = createTombstone(article);
  assert(html.includes('Canada / USA'));
});
