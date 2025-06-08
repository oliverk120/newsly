const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logPath = path.join(logDir, 'app.log');

function write(level, message) {
  const line = `${new Date().toISOString()} ${level}: ${message}\n`;
  fs.appendFileSync(logPath, line);
}

module.exports = {
  info: msg => write('INFO', msg),
  error: msg =>
    write('ERROR', msg instanceof Error ? msg.stack || msg.message : msg)
};
