const test = require('node:test');
const assert = require('node:assert/strict');
const insertArticles = require('../lib/insertArticles');

function createDb(options) {
  const inserted = [];
  const seen = new Set();
  return {
    run: async (sql, params) => {
      const id = options.nextId++;
      const link = params[3];
      const duplicate = seen.has(link);
      if (!duplicate) seen.add(link);

      if (options.isPg) {
        inserted.push({ id, params });
        if (options.missingRowCount) return duplicate ? {} : {};
        return { changes: duplicate ? 0 : 1 };
      }
      inserted.push({ id, params });
      return { changes: duplicate ? 0 : 1, lastID: id };
    },
    get: async (sql, params) => {
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

test('handles missing rowCount by verifying row existence', async () => {
  const db = createDb({ nextId: 20, isPg: true, missingRowCount: true });
  const articles = [
    { title: 't3', description: '', time: '3', link: 'c', image: null }
  ];
  const { inserted, insertedIds } = await insertArticles(db, articles, true);
  assert.equal(inserted, 1);
  assert.deepEqual(insertedIds, [20]);
});

test('ignores duplicate articles for postgres', async () => {
  const db = createDb({ nextId: 30, isPg: true });
  const a = { title: 'dup', description: '', time: '1', link: 'd', image: null };
  await insertArticles(db, [a], true);
  const { inserted, insertedIds } = await insertArticles(db, [a], true);
  assert.equal(inserted, 0);
  assert.deepEqual(insertedIds, []);
});
