const test = require('node:test');
const assert = require('node:assert/strict');
const normalizeDate = require('../lib/normalizeDate');

test('parses full date strings', () => {
  const iso = normalizeDate('Jun 05, 2025, 16:45 ET');
  assert.ok(iso.startsWith('2025-06-05T16:45'));
});

test('falls back to scrape date when only time given', () => {
  const iso = normalizeDate('08:30 ET', '2025-06-06 00:00:00');
  assert.ok(iso.startsWith('2025-06-06T08:30'));
});

test('returns empty string for invalid input', () => {
  assert.equal(normalizeDate('', '2025-06-06'), '');
});
