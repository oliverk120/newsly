const test = require('node:test');
const assert = require('node:assert/strict');
const { classifySectorFromVectors } = require('../lib/classifySector');

const sectors = ['A', 'B', 'C', 'D', 'E', 'F'];

// simple 2D vectors for ease of testing
const sectorVecs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1]
];

test('selects sector with highest cosine similarity', () => {
  const articleVec = [0.9, 0.1];
  const sector = classifySectorFromVectors(articleVec, sectorVecs, sectors);
  assert.equal(sector, 'A');
});

test('returns empty string when vectors missing', () => {
  const sector = classifySectorFromVectors(null, null, sectors);
  assert.equal(sector, '');
});
