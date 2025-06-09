const test = require('node:test');
const assert = require('node:assert/strict');
const extractValueAndLocation = require('../../lib/enrichment/extractValueAndLocation');

function createArticleDb(initialLocation = 'Paris') {
  const store = { location: initialLocation, currency: '', steps: [] };
  return {
    get: async (sql, params) => {
      if (sql.includes('body, location')) {
        return { body: 'body text', location: store.location };
      }
      if (sql.startsWith('SELECT 1 FROM article_enrichment_steps')) {
        const step = params[1];
        return store.steps.includes(step) ? { 1: 1 } : undefined;
      }
      if (sql.startsWith('SELECT step_name FROM article_enrichment_steps')) {
        return store.steps.map(s => ({ step_name: s }));
      }
      return null;
    },
    all: async (sql) => {
      if (sql.startsWith('SELECT step_name FROM article_enrichment_steps')) {
        return store.steps.map(s => ({ step_name: s }));
      }
      return [];
    },
    run: async (sql, params) => {
      if (sql.startsWith('INSERT INTO article_enrichments')) {
        store.dealValue = params[1];
        store.currency = params[2];
        store.location = params[3];
      } else if (sql.startsWith('INSERT INTO article_enrichment_steps')) {
        const step = params[1];
        if (!store.steps.includes(step)) store.steps.push(step);
      }
      return { changes: 1 };
    }
  };
}

const mockConfigDb = {
  get: async () => ({}),
  run: async () => {}
};

test('extracts deal value and updates location', async () => {
  const mockOpenAI = {
    chat: {
      completions: {
        create: async () => ({
          choices: [{ message: { content: '{"dealValue":"$100m","currency":"USD","location":"Paris, France"}' } }]
        })
      }
    }
  };
  const db = createArticleDb();
  const result = await extractValueAndLocation(db, mockConfigDb, mockOpenAI, 1);
  assert.equal(result.dealValue, '$100m');
  assert.equal(result.currency, 'USD');
  assert.equal(result.location, 'Paris, France');
});

test('handles invalid JSON output', async () => {
  const mockOpenAI = {
    chat: { completions: { create: async () => ({ choices: [{ message: { content: 'invalid' } }] }) } }
  };
  const db = createArticleDb('Toronto');
  const result = await extractValueAndLocation(db, mockConfigDb, mockOpenAI, 2);
  assert.equal(result.dealValue, 'undisclosed');
  assert.equal(result.currency, '');
  assert.equal(result.location, 'Toronto');
});
