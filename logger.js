const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logPath = path.join(logDir, 'app.log');
const debugEnabled = process.env.DEBUG === '1' || process.env.DEBUG === 'true';

function write(level, message) {
  const line = `${new Date().toISOString()} ${level}: ${message}\n`;
  fs.appendFileSync(logPath, line);
}

module.exports = {
  info: msg => write('INFO', msg),
  error: msg =>
    write('ERROR', msg instanceof Error ? msg.stack || msg.message : msg)
  ,
  debug: msg => {
    if (debugEnabled) write('DEBUG', msg);
  }
};
