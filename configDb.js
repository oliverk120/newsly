// The config database used to be a separate SQLite/Postgres connection.
// It now shares the same connection and helper methods as the main app DB.

module.exports = require('./db');
