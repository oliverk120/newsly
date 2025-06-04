const test = require('node:test');
const assert = require('node:assert/strict');
const { extractParties } = require('../../lib/extractParties');

test('extracts acquiror, seller and target using OpenAI output', async () => {
  const mockOpenAI = {
    chat: {
      completions: {
        create: async () => ({
          choices: [{ message: { content: '{"acquiror":"Acme","seller":"SellerCo","target":"Foo"}' } }]
        })
      }
    }
  };
  const body = 'Acme Corp. today announced it will acquire Foo Inc.';
  const result = await extractParties(mockOpenAI, 'Acme buys Foo', body);
  assert.equal(result.acquiror, 'Acme');
  assert.equal(result.seller, 'SellerCo');
  assert.equal(result.target, 'Foo');
});

test('handles invalid OpenAI JSON', async () => {
  const mockOpenAI = {
    chat: {
      completions: {
        create: async () => ({ choices: [{ message: { content: 'invalid' } }] })
      }
    }
  };
  const body = 'No acquisition mentioned.';
  const result = await extractParties(mockOpenAI, 'Some title', body);
  assert.equal(result.acquiror, 'N/A');
  assert.equal(result.seller, 'N/A');
  assert.equal(result.target, 'N/A');
});
