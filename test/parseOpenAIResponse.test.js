const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOpenAIResponse, getFirstSentence } = require('../lib/extractParties');

test('parses valid JSON with acquiror, seller, target and type', () => {
  const result = parseOpenAIResponse('{"acquiror":"Acme","seller":"SellerCo","target":"Foo","transaction_type":"M&A"}');
  assert.deepEqual(result, {
    acquiror: 'Acme',
    seller: 'SellerCo',
    target: 'Foo',
    transactionType: 'M&A'
  });
});

test('returns N/A for invalid JSON', () => {
  const result = parseOpenAIResponse('invalid');
  assert.deepEqual(result, {
    acquiror: 'N/A',
    seller: 'N/A',
    target: 'N/A',
    transactionType: 'Other'
  });
});

test('getFirstSentence handles abbreviations', () => {
  const text = 'Andlauer Healthcare Group Inc. announced something today. Another sentence.';
  assert.equal(getFirstSentence(text), 'Andlauer Healthcare Group Inc. announced something today.');
});

test('getFirstSentence handles multiple abbreviations', () => {
  const text = 'Dr. Smith moved to the U.S. yesterday. He works there.';
  assert.equal(getFirstSentence(text), 'Dr. Smith moved to the U.S. yesterday.');
});
