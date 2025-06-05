const fetchAndStoreBody = require('./fetchAndStoreBody');
const extractDateLocation = require('./extractDateLocation');
const extractParties = require('./extractParties');

module.exports = (articleDb, configDb, openai) => {
  return async function processArticle(id) {
    const bodyRes = await fetchAndStoreBody(articleDb, configDb, openai, id);
    if (bodyRes && bodyRes.body) {
      await extractDateLocation(articleDb, configDb, id);
    }
    await extractParties(articleDb, configDb, openai, id);
  };
};
