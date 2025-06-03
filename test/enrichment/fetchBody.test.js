const test = require('node:test');
const assert = require('node:assert/strict');
const fetchBody = require('../../lib/fetchBody');

test('uses provided selector to extract text', async () => {
  const html = '<div id="main"><p>First</p><p>Second</p></div>';
  const mockHttp = { get: async () => ({ data: html }) };
  const body = await fetchBody('http://example.com', '#main', mockHttp);
  assert.equal(body, 'First\nSecond');
});

test('falls back to article tag when selector missing', async () => {
  const html = '<article><p>Foo</p><p>Bar</p></article>';
  const mockHttp = { get: async () => ({ data: html }) };
  const body = await fetchBody('http://example.com', null, mockHttp);
  assert.equal(body, 'Foo\nBar');
});
