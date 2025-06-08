const logger = require('../../logger');

async function appendLog(db, id, message) {
  const ts = new Date().toISOString();
  logger.info(`[article:${id}] ${message}`);
}

module.exports = appendLog;
