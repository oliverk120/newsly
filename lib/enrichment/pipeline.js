const fetchAndStoreBody = require('./fetchAndStoreBody');
const extractDateLocation = require('./extractDateLocation');
const extractParties = require('./extractParties');
const summarizeArticle = require('./summarizeArticle');
const extractValueAndLocation = require('./extractValueAndLocation');
const { runFilters } = require('../filters');

module.exports = (articleDb, configDb, openai) => {
  const stepFns = {
    filters: (id, logs, progress) => runFilters(articleDb, configDb, [id], logs),
    body: (id, progress) => fetchAndStoreBody(articleDb, configDb, openai, id, progress),
    date: (id, progress) => extractDateLocation(articleDb, configDb, id, progress),
    parties: (id, progress) => extractParties(articleDb, configDb, openai, id, progress),
    summary: (id, progress) => summarizeArticle(articleDb, configDb, openai, id, progress),
    value: (id, progress) => extractValueAndLocation(articleDb, configDb, openai, id, progress)
  };

  const defaultSteps = ['body', 'date', 'parties', 'summary', 'value'];

  return async function processArticle(id, steps = defaultSteps, logs = [], progress) {
    let bodyRes = null;
    for (const step of steps) {
      switch (step) {
        case 'filters':
          await stepFns.filters(id, logs, progress);
          break;
        case 'body':
          bodyRes = await stepFns.body(id, progress);
          break;
        case 'date':
          // If body step was run and failed to fetch text, skip date extraction
          if (steps.includes('body') && bodyRes && !bodyRes.body) break;
          await stepFns.date(id, progress);
          break;
        case 'parties':
          await stepFns.parties(id, progress);
          break;
        case 'summary':
          await stepFns.summary(id, progress);
          break;
        case 'value':
          await stepFns.value(id, progress);
          break;
        default:
          // ignore unknown step names
          break;
      }
    }
  };
};
