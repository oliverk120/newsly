const test = require('node:test');
const assert = require('node:assert/strict');
const { runFilters } = require('../lib/filters');

function createArticleDb(articles) {
  const matches = [];
  return {
    get: async (sql, params) => {
      if (sql.includes('article_filter_matches')) {
        return matches.find(
          m => m.article_id === params[0] && m.filter_id === params[1]
        );
      }
      return articles[params[0]];
    },
    run: async (sql, params) => {
      if (sql.includes('article_filter_matches')) {
        const pair = { article_id: params[0], filter_id: params[1] };
        const exists = matches.some(
          m => m.article_id === pair.article_id && m.filter_id === pair.filter_id
        );
        if (!exists) matches.push(pair);
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

test('does not insert duplicate matches', async () => {
  const articles = { 2: { title: 'Deal announcement', description: '' } };
  const filters = [{ id: 7, type: 'keyword', value: 'deal', active: 1 }];
  const articleDb = createArticleDb(articles);
  const configDb = createConfigDb(filters);

  await runFilters(articleDb, configDb, [2], []);
  await runFilters(articleDb, configDb, [2], []);
  assert.equal(articleDb.matches.length, 1);
  assert.deepEqual(articleDb.matches[0], { article_id: 2, filter_id: 7 });
});
