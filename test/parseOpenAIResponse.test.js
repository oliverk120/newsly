const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOpenAIResponse } = require('../lib/extractParties');

test('parses valid JSON with acquiror and target', () => {
  const result = parseOpenAIResponse('{"acquiror":"Acme","target":"Foo"}');
  assert.deepEqual(result, { acquiror: 'Acme', target: 'Foo' });
});

test('returns N/A for invalid JSON', () => {
  const result = parseOpenAIResponse('invalid');
  assert.deepEqual(result, { acquiror: 'N/A', target: 'N/A' });
});
