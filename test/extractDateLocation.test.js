const test = require('node:test');
const assert = require('node:assert/strict');
const extractDateLocation = require('../lib/extractDateLocation');

test('extracts date and location from CNW style sentence', () => {
  const text = 'EDMONTON, AB, May 20, 2025 /CNW/ - Maverick acquires Maxcraft.';
  const res = extractDateLocation(text);
  assert.equal(res.date, 'May 20, 2025');
  assert.equal(res.location, 'EDMONTON, AB');
});

test('returns empty strings when pattern missing', () => {
  const res = extractDateLocation('No date or location here.');
  assert.equal(res.date, '');
  assert.equal(res.location, '');
});
