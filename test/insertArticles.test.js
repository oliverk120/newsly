const test = require('node:test');
const assert = require('node:assert/strict');
const insertArticles = require('../lib/insertArticles');

function createDb(options) {
  const inserted = [];
  return {
    run: async (sql, params) => {
      const id = options.nextId++;
      if (options.isPg) {
        // Postgres style: no lastID returned
        inserted.push({ id, params });
        return { changes: 1 };
      }
      inserted.push({ id, params });
      return { changes: 1, lastID: id };
    },
    get: async (sql, params) => {
      // return id based on params
      const match = inserted.find(r => r.params[3] === params[0]);
      return match ? { id: match.id } : undefined;
    }
  };
}

test('returns inserted IDs for sqlite', async () => {
  const db = createDb({ nextId: 1, isPg: false });
  const articles = [
    { title: 't', description: '', time: '1', link: 'a', image: null }
  ];
  const { inserted, insertedIds } = await insertArticles(db, articles, false);
  assert.equal(inserted, 1);
  assert.deepEqual(insertedIds, [1]);
});

test('fetches IDs when lastID is missing (postgres)', async () => {
  const db = createDb({ nextId: 10, isPg: true });
  const articles = [
    { title: 't2', description: '', time: '2', link: 'b', image: null }
  ];
  const { inserted, insertedIds } = await insertArticles(db, articles, true);
  assert.equal(inserted, 1);
  assert.deepEqual(insertedIds, [10]);
});
