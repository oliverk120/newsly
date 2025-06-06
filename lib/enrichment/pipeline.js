const fetchAndStoreBody = require('./fetchAndStoreBody');
const extractDateLocation = require('./extractDateLocation');
const extractParties = require('./extractParties');
const summarizeArticle = require('./summarizeArticle');
const extractValueAndLocation = require('./extractValueAndLocation');

module.exports = (articleDb, configDb, openai) => {
  const stepFns = {
    body: id => fetchAndStoreBody(articleDb, configDb, openai, id),
    date: id => extractDateLocation(articleDb, configDb, id),
    parties: id => extractParties(articleDb, configDb, openai, id),
    summary: id => summarizeArticle(articleDb, configDb, openai, id),
    value: id => extractValueAndLocation(articleDb, configDb, openai, id)
  };

  const allSteps = Object.keys(stepFns);

  return async function processArticle(id, steps = allSteps) {
    let bodyRes = null;
    for (const step of steps) {
      switch (step) {
        case 'body':
          bodyRes = await stepFns.body(id);
          break;
        case 'date':
          // If body step was run and failed to fetch text, skip date extraction
          if (steps.includes('body') && bodyRes && !bodyRes.body) break;
          await stepFns.date(id);
          break;
        case 'parties':
          await stepFns.parties(id);
          break;
        case 'summary':
          await stepFns.summary(id);
          break;
        case 'value':
          await stepFns.value(id);
          break;
        default:
          // ignore unknown step names
          break;
      }
    }
  };
};
