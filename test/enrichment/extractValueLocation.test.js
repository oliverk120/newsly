const test = require('node:test');
const assert = require('node:assert/strict');
const extractValueAndLocation = require('../../lib/enrichment/extractValueAndLocation');

function createArticleDb(initialLocation = 'Paris') {
  const store = { location: initialLocation, completed: '' };
  return {
    get: async (sql) => {
      if (sql.includes('body, location')) {
        return { body: 'body text', location: store.location };
      }
      if (sql.includes('SELECT completed')) {
        return { completed: store.completed };
      }
      return null;
    },
    run: async (sql, params) => {
      if (sql.startsWith('INSERT INTO article_enrichments')) {
        store.dealValue = params[1];
        store.location = params[2];
      } else if (sql.startsWith('UPDATE article_enrichments SET completed')) {
        store.completed = params[0];
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
          choices: [{ message: { content: '{"dealValue":"$100m","location":"Paris, France"}' } }]
        })
      }
    }
  };
  const db = createArticleDb();
  const result = await extractValueAndLocation(db, mockConfigDb, mockOpenAI, 1);
  assert.equal(result.dealValue, '$100m');
  assert.equal(result.location, 'Paris, France');
});

test('handles invalid JSON output', async () => {
  const mockOpenAI = {
    chat: { completions: { create: async () => ({ choices: [{ message: { content: 'invalid' } }] }) } }
  };
  const db = createArticleDb('Toronto');
  const result = await extractValueAndLocation(db, mockConfigDb, mockOpenAI, 2);
  assert.equal(result.dealValue, 'undisclosed');
  assert.equal(result.location, 'Toronto');
});
