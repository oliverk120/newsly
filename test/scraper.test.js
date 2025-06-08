const test = require('node:test');
const assert = require('node:assert/strict');
const { dedupeArticles } = require('../lib/scraper');

const html = `
  <div class="card">
    <h3>Title 1 <small>Jan 1</small></h3>
    <p>Desc</p>
    <a href="/a1">Read</a>
  </div>
  <div class="card">
    <h3>Title 1 <small>Jan 1</small></h3>
    <p>Desc</p>
    <a href="/a1">Read</a>
  </div>
  <div class="card">
    <h3>Title 2 <small>Jan 2</small></h3>
    <p>Desc2</p>
    <a href="/a2">Read</a>
  </div>
`;

const source = {
  base_url: 'http://example.com',
  article_selector: 'div.card',
  title_selector: 'h3',
  description_selector: 'p',
  time_selector: 'h3 small',
  link_selector: 'a',
  image_selector: null,
};

test('dedupeArticles removes duplicate articles by link', () => {
  const articles = [
    { title: 'Title 1', link: 'http://example.com/a1', description: '', time: '1', image: null },
    { title: 'Title 1', link: 'http://example.com/a1', description: '', time: '1', image: null },
    { title: 'Title 2', link: 'http://example.com/a2', description: '', time: '2', image: null }
  ];
  const deduped = dedupeArticles(articles);
  assert.equal(deduped.length, 2);
  assert.deepEqual(
    deduped.map(a => a.link).sort(),
    ['http://example.com/a1', 'http://example.com/a2']
  );
});
