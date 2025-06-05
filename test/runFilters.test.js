const test = require('node:test');
const assert = require('node:assert/strict');
const { runFilters } = require('../lib/filters');

function createArticleDb(articles) {
  const matches = [];
  return {
    get: async (sql, params) => articles[params[0]],
    run: async (sql, params) => {
      if (sql.includes('article_filter_matches')) {
        matches.push({ article_id: params[0], filter_id: params[1] });
      }
      return { changes: 1 };
    },
    matches
  };
}

function createConfigDb(filters) {
  return {
    all: async () => filters,
  };
}

test('keyword filters support wildcard *', async () => {
  const articles = { 1: { title: 'Company plans divestiture', description: '' } };
  const filters = [{ id: 5, type: 'keyword', value: 'divest*', active: 1 }];
  const articleDb = createArticleDb(articles);
  const configDb = createConfigDb(filters);

  await runFilters(articleDb, configDb, [1], []);
  assert.equal(articleDb.matches.length, 1);
  assert.deepEqual(articleDb.matches[0], { article_id: 1, filter_id: 5 });
});
