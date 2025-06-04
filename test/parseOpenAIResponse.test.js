const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOpenAIResponse, getFirstSentence } = require('../lib/extractParties');

test('parses valid JSON with acquiror, seller and target', () => {
  const result = parseOpenAIResponse('{"acquiror":"Acme","seller":"SellerCo","target":"Foo"}');
  assert.deepEqual(result, { acquiror: 'Acme', seller: 'SellerCo', target: 'Foo' });
});

test('returns N/A for invalid JSON', () => {
  const result = parseOpenAIResponse('invalid');
  assert.deepEqual(result, { acquiror: 'N/A', seller: 'N/A', target: 'N/A' });
});

test('getFirstSentence handles abbreviations', () => {
  const text = 'Andlauer Healthcare Group Inc. announced something today. Another sentence.';
  assert.equal(getFirstSentence(text), 'Andlauer Healthcare Group Inc. announced something today.');
});

test('getFirstSentence handles multiple abbreviations', () => {
  const text = 'Dr. Smith moved to the U.S. yesterday. He works there.';
  assert.equal(getFirstSentence(text), 'Dr. Smith moved to the U.S. yesterday.');
});
