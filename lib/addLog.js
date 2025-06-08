const logger = require('../logger');

function addLog(logs, message) {
  logger.info(message);
  if (logs) logs.push(message);
}

module.exports = addLog;
