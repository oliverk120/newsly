const fetchBody = require('./fetchBody');
const extractParties = require('./extractParties');

module.exports = (db, openai) => {
  return async function processArticle(id) {
    await fetchBody(db, id);
    await extractParties(db, openai, id);
  };
};
