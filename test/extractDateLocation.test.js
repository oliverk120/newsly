const test = require('node:test');
const assert = require('node:assert/strict');
const extractDateLocation = require('../lib/extractDateLocation');

test('extracts date and location from CNW style sentence', () => {
  const text = 'EDMONTON, AB, May 20, 2025 /CNW/ - Maverick acquires Maxcraft.';
  const res = extractDateLocation(text);
  assert.equal(res.date, 'May 20, 2025');
  assert.equal(res.location, 'EDMONTON, AB');
});

test('handles lines with a prefixed date', () => {
  const text = 'Jun 03, 2025, 08:44 ET Share this article SANTO DOMINGO, Dominican Republic, June 3, 2025 /CNW/ - Something happened.';
  const res = extractDateLocation(text);
  assert.equal(res.date, 'June 3, 2025');
  assert.equal(res.location, 'SANTO DOMINGO, Dominican Republic');
});

test('returns empty strings when pattern missing', () => {
  const res = extractDateLocation('No date or location here.');
  assert.equal(res.date, '');
  assert.equal(res.location, '');
});
