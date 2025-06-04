const fetchBody = require('./fetchBody');
const extractDateLocation = require('./extractDateLocation');
const extractParties = require('./extractParties');

module.exports = (db, openai) => {
  return async function processArticle(id) {
    const bodyRes = await fetchBody(db, id);
    if (bodyRes && bodyRes.body) {
      await extractDateLocation(db, id);
    }
    await extractParties(db, openai, id);
  };
};
