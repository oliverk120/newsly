const CLAIRFIELD_SECTORS = [
  'Business services',
  'Consumer goods & retail',
  'Energy, cleantech & resources',
  'Healthcare',
  'Industrials',
  'Software, tech & digital'
];

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function classifySectorFromVectors(articleVec, sectorVectors, names = CLAIRFIELD_SECTORS) {
  if (!articleVec || !Array.isArray(sectorVectors)) return '';
  let best = '';
  let bestScore = -Infinity;
  for (let i = 0; i < names.length; i++) {
    const vec = sectorVectors[i];
    if (!vec) continue;
    const score = cosineSimilarity(articleVec, vec);
    if (score > bestScore) {
      bestScore = score;
      best = names[i];
    }
  }
  return best;
}

let cachedSectorVectors = null;
async function getSectorVectors(openai) {
  if (cachedSectorVectors) return cachedSectorVectors;
  if (!openai || !openai.embeddings || typeof openai.embeddings.create !== 'function') {
    cachedSectorVectors = CLAIRFIELD_SECTORS.map(() => null);
    return cachedSectorVectors;
  }
  const resp = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: CLAIRFIELD_SECTORS
  });
  cachedSectorVectors = resp.data.map(d => d.embedding);
  return cachedSectorVectors;
}

async function classifySector(openai, articleVec) {
  if (!articleVec) return '';
  const sectorVecs = await getSectorVectors(openai);
  return classifySectorFromVectors(articleVec, sectorVecs, CLAIRFIELD_SECTORS);
}

module.exports = {
  CLAIRFIELD_SECTORS,
  classifySectorFromVectors,
  classifySector
};
