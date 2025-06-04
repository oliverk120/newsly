const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyTransaction, parseTransactionType } = require('../lib/classifyTransaction');

test('classifies transaction using OpenAI output', async () => {
  const mockOpenAI = {
    chat: { completions: { create: async () => ({ choices: [{ message: { content: 'Financing' } }] }) } }
  };
  const res = await classifyTransaction(mockOpenAI, 'Title', 'Desc');
  assert.equal(res.transactionType, 'Financing');
});

test('parseTransactionType normalizes output', () => {
  assert.equal(parseTransactionType('m&a'), 'M&A');
  assert.equal(parseTransactionType('Financing'), 'Financing');
  assert.equal(parseTransactionType('something else'), 'Other');
});
