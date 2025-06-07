const prisma = require('./prismaClient');

async function run(sql, params = []) {
  const changes = await prisma.$executeRawUnsafe(sql, ...params);
  return { lastID: 0, changes: typeof changes === 'number' ? changes : 0 };
}

async function get(sql, params = []) {
  const rows = await prisma.$queryRawUnsafe(sql, ...params);
  return rows[0] || null;
}

async function all(sql, params = []) {
  const rows = await prisma.$queryRawUnsafe(sql, ...params);
  return rows;
}

function serialize(fn) {
  return fn();
}

module.exports = { run, get, all, serialize, raw: prisma };
