const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

function createStubDb(countValue) {
  const calls = [];
  return {
    calls,
    run: async (sql, params) => {
      calls.push({ method: 'run', sql, params });
      return { changes: 1 };
    },
    get: async (sql, params) => {
      calls.push({ method: 'get', sql, params });
      if (/SELECT id FROM filters/.test(sql)) return undefined;
      if (/COUNT\(\*\) as count FROM sources/.test(sql)) return { count: countValue };
      if (/COUNT\(\*\) as count FROM article_enrichment_steps/.test(sql)) return { count: 0 };
      return undefined;
    },
    all: async (sql, params) => {
      calls.push({ method: 'all', sql, params });
      return [];
    },
    raw: { getDialect: () => 'sqlite' }
  };
}

test('adds default source when count is string', async () => {
  const dbPath = path.resolve(__dirname, '../db.js');
  const configPath = path.resolve(__dirname, '../configDb.js');
  const stubDb = createStubDb(0);
  const stubConfigDb = createStubDb('0');
  require.cache[dbPath] = { exports: stubDb };
  require.cache[configPath] = { exports: stubConfigDb };

  delete require.cache[path.resolve(__dirname, '../db/init.js')];
  const initDb = require('../db/init');
  await initDb();

  const inserted = stubConfigDb.calls.find(
    c => c.method === 'run' && /INSERT\s+INTO\s+sources/.test(c.sql)
  );
  assert(inserted, 'expected sources insert');

  delete require.cache[path.resolve(__dirname, '../db/init.js')];
  delete require.cache[dbPath];
  delete require.cache[configPath];
});
