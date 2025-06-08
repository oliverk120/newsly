let defaultHttp;
let cheerioLib;
const normalizeDate = require('./normalizeDate');

async function scrapeSource(source, http, parser) {
  if (!http) {
    if (!defaultHttp) defaultHttp = require('axios');
    http = defaultHttp;
  }
  if (!parser) {
    if (!cheerioLib) cheerioLib = require('cheerio');
    parser = cheerioLib;
  }
  const response = await http.get(source.base_url);
  const $ = parser.load(response.data);

  const articles = [];
  const scrapedAt = new Date().toISOString();

  $(source.article_selector).each((i, el) => {
    const container = $(el);
    let time = '';
    if (source.time_selector) {
      time = container.find(source.time_selector).text().trim();
      container.find(source.time_selector).remove();
    }
    const normalizedTime = normalizeDate(time, scrapedAt) || time;
    const title = container.find(source.title_selector).text().trim();
    const description = source.description_selector
      ? container.find(source.description_selector).text().trim()
      : '';
    let link = source.link_selector
      ? container.find(source.link_selector).attr('href') || ''
      : '';
    if (link && !link.startsWith('http')) {
      try {
        link = new URL(link, source.base_url).href;
      } catch (e) {}
    }
    const image = source.image_selector
      ? container.find(source.image_selector).attr('src') || null
      : null;

    articles.push({ title, description, time: normalizedTime, link, image });
  });
  return dedupeArticles(articles);
}

function dedupeArticles(articles) {
  const seen = new Set();
  const deduped = [];
  for (const article of articles) {
    const key = article.link || `${article.title}-${article.time}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(article);
  }
  return deduped;
}
module.exports = { scrapeSource, dedupeArticles };
