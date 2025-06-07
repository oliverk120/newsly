const { Sequelize, QueryTypes } = require('sequelize');
const path = require('path');

let sequelize;
if (process.env.CONFIG_DB_URL) {
  sequelize = new Sequelize(process.env.CONFIG_DB_URL, { logging: false });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'config.db'),
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
