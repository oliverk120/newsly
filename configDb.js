const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const connection = new sqlite3.Database(
  path.join(__dirname, 'config.db')
);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function serialize(fn) {
  connection.serialize(fn);
}

module.exports = { run, get, all, serialize, raw: connection };
