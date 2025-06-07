const { Sequelize, QueryTypes } = require('sequelize');
const path = require('path');

let sequelize;
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set in production');
  }
  sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'raw_articles.db'),
    logging: false
  });
}

async function run(sql, params = []) {
  const [, metadata] = await sequelize.query(sql, { replacements: params });
  const changes =
    typeof metadata.rowCount === 'number'
      ? metadata.rowCount
      : metadata.changes || 0;
  return { lastID: metadata.lastID, changes };
}

async function get(sql, params = []) {
  const rows = await sequelize.query(sql, {
    replacements: params,
    type: QueryTypes.SELECT
  });
  return rows[0];
}

async function all(sql, params = []) {
  return sequelize.query(sql, {
    replacements: params,
    type: QueryTypes.SELECT
  });
}

async function serialize(fn) {
  await fn();
}

module.exports = { run, get, all, serialize, raw: sequelize };
