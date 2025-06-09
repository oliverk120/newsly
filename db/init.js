const db = require('../db');
const configDb = require('../configDb');

async function hasColumn(database, table, column) {
  if (database.raw?.getDialect() === 'postgres') {
    const row = await database.get(
      `SELECT column_name FROM information_schema.columns WHERE table_name = ? AND column_name = ?`,
      [table, column]
    );
    return !!row;
  }
  const info = await database.all(`PRAGMA table_info(${table})`);
  return info.some((r) => r.name === column);
}

async function initDb() {
  const isPg = db.raw?.getDialect() === 'postgres';
  const configIsPg = configDb.raw?.getDialect() === 'postgres';
  const idColumn = isPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY';
  const configIdColumn = configIsPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY';
  const dateTime = isPg ? 'TIMESTAMP' : 'DATETIME';
  const configDateTime = configIsPg ? 'TIMESTAMP' : 'DATETIME';

  await db.run(`CREATE TABLE IF NOT EXISTS articles (
    id ${idColumn},
    title TEXT,
    description TEXT,
    time TEXT,
    link TEXT UNIQUE,
    image TEXT,
    created_at ${dateTime} DEFAULT CURRENT_TIMESTAMP
  )`);

  await configDb.run(`CREATE TABLE IF NOT EXISTS filters (
    id ${configIdColumn},
    name TEXT,
    type TEXT NOT NULL, -- 'keyword' or 'embedding'
    value TEXT,
    active INTEGER DEFAULT 1,
    created_at ${configDateTime} DEFAULT CURRENT_TIMESTAMP
  )`);

  const existing = await configDb.get(
    'SELECT id FROM filters WHERE name = ? LIMIT 1',
    ['M&A']
  );
  if (!existing) {
    const insertSql = configIsPg
      ? 'INSERT INTO filters (name, type, value, active) VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING'
      : 'INSERT OR IGNORE INTO filters (name, type, value, active) VALUES (?, ?, ?, ?)';
    await configDb.run(insertSql, [
      'M&A',
      'keyword',
      'acquir*, acquisition, sell, purchas*, merg*, sale',
      1
    ]);
  }

  await db.run(`CREATE TABLE IF NOT EXISTS article_filter_matches (
    id ${idColumn},
    article_id INTEGER,
    filter_id INTEGER,
    matched_at ${dateTime} DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  const dedupeSql = isPg
    ? `DELETE FROM article_filter_matches a USING article_filter_matches b
        WHERE a.id < b.id
          AND a.article_id = b.article_id
          AND a.filter_id = b.filter_id`
    : `DELETE FROM article_filter_matches
        WHERE rowid NOT IN (
          SELECT MIN(rowid)
          FROM article_filter_matches
          GROUP BY article_id, filter_id
        )`;
  await db.run(dedupeSql);

  await db.run(
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_article_filter_unique ON article_filter_matches(article_id, filter_id)'
  );

  await db.run(`CREATE TABLE IF NOT EXISTS article_enrichments (
    article_id INTEGER PRIMARY KEY,
    embedding TEXT,
    is_mna INTEGER,
    acquiror TEXT,
    seller TEXT,
    target TEXT,
    about_acquiror TEXT,
    about_seller TEXT,
    about_target TEXT,
    acquiror_hq TEXT,
    seller_hq TEXT,
    target_hq TEXT,
    deal_value TEXT,
    currency TEXT,
    industry TEXT,
    extra TEXT,
    article_date TEXT,
    location TEXT,
    body TEXT,
    transaction_type TEXT,
    completed TEXT,
    log TEXT,
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS article_enrichment_steps (
    article_id INTEGER,
    step_name TEXT,
    completed_at ${dateTime} DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(article_id, step_name),
    FOREIGN KEY(article_id) REFERENCES articles(id)
  )`);

  const stepCountRow = await db.get(
    'SELECT COUNT(*) as count FROM article_enrichment_steps'
  );
  if (stepCountRow.count === 0) {
    const rows = await db.all(
      'SELECT article_id, completed, embedding FROM article_enrichments'
    );
    for (const r of rows) {
      let steps = [];
      if (r.completed) {
        steps = r.completed
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (r.embedding && !steps.includes('embedding')) steps.push('embedding');
      for (const s of steps) {
        const sql = isPg
          ? 'INSERT INTO article_enrichment_steps (article_id, step_name) VALUES (?, ?) ON CONFLICT DO NOTHING'
          : 'INSERT OR IGNORE INTO article_enrichment_steps (article_id, step_name) VALUES (?, ?)';
        await db.run(sql, [r.article_id, s]);
      }
    }
  }

  await configDb.run(`CREATE TABLE IF NOT EXISTS prompts (
    name TEXT PRIMARY KEY,
    template TEXT,
    fields TEXT
  )`);

  const hasPromptFields = await hasColumn(configDb, 'prompts', 'fields');
  if (!hasPromptFields) {
    await configDb.run('ALTER TABLE prompts ADD COLUMN fields TEXT');
  }

  const promptRow = await configDb.get(
    'SELECT template, fields FROM prompts WHERE name = ?',
    ['extractParties']
  );
  if (!promptRow) {
    await configDb.run(
      'INSERT INTO prompts (name, template, fields) VALUES (?, ?, ?)',
      [
        'extractParties',
        'Extract the acquiror, seller, target and the transaction type ("M&A", "Financing" or "Other"). Anything relating to one party buying, acquiring another is considered "M&A". The target and seller are often the same in an M&A transaction, but the target may also be select assets or a division of the seller. In a financing, the company issuing the financing is the seller. If none are mentioned, respond with JSON {"acquiror":"N/A","seller":"N/A","target":"N/A","transactionType":"Other"}.  Text: "{text}"',
        'acquiror,seller,target,transaction_type'
      ]
    );
  } else if (!promptRow.fields) {
    await configDb.run('UPDATE prompts SET fields = ? WHERE name = ?', [
      'acquiror,seller,target,transaction_type',
      'extractParties'
    ]);
  }

  const sumRow = await configDb.get(
    'SELECT template, fields FROM prompts WHERE name = ?',
    ['summarizeArticle']
  );
  if (!sumRow) {
    await configDb.run(
      'INSERT INTO prompts (name, template, fields) VALUES (?, ?, ?)',
      [
        'summarizeArticle',
        'Summarize the following article in 2-3 sentences and classify the Clairfield sector and industry. Provide a short note about the acquiror, target and seller and list each party\'s headquarters location. Respond with JSON {"summary":"...","sector":"...","industry":"...","about_acquiror":"...","about_target":"...","about_seller":"...","acquiror_hq":"...","target_hq":"...","seller_hq":"..."}. Text: "{text}"',
        'summary,sector,industry,about_acquiror,about_target,about_seller,acquiror_hq,target_hq,seller_hq'
      ]
    );
  } else if (!sumRow.fields) {
    await configDb.run('UPDATE prompts SET fields = ? WHERE name = ?', [
      'summary,sector,industry,about_acquiror,about_target,about_seller,acquiror_hq,target_hq,seller_hq',
      'summarizeArticle'
    ]);
  }

  const valRow = await configDb.get(
    'SELECT template, fields FROM prompts WHERE name = ?',
    ['extractValueLocation']
  );
  if (!valRow) {
    await configDb.run(
      'INSERT INTO prompts (name, template, fields) VALUES (?, ?, ?)',
      [
        'extractValueLocation',
        'Extract the transaction value in US dollars from the article text if mentioned. If none is present respond with "undisclosed". Review the provided location "{location}" and return a more complete location including country if possible. Respond with JSON {"dealValue":"...","currency":"...","location":"..."}. Text: "{text}"',
        'deal_value,currency,location'
      ]
    );
  } else if (!valRow.fields) {
    await configDb.run('UPDATE prompts SET fields = ? WHERE name = ?', [
      'deal_value,currency,location',
      'extractValueLocation'
    ]);
  }

  const hasBody = await hasColumn(db, 'article_enrichments', 'body');
  if (!hasBody) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN body TEXT');
  }
  const hasSeller = await hasColumn(db, 'article_enrichments', 'seller');
  if (!hasSeller) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN seller TEXT');
  }
  const hasCompleted = await hasColumn(db, 'article_enrichments', 'completed');
  if (!hasCompleted) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN completed TEXT');
  }
  const hasDate = await hasColumn(db, 'article_enrichments', 'article_date');
  if (!hasDate) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN article_date TEXT');
  }
  const hasLocation = await hasColumn(db, 'article_enrichments', 'location');
  if (!hasLocation) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN location TEXT');
  }
  const hasTx = await hasColumn(db, 'article_enrichments', 'transaction_type');
  if (!hasTx) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN transaction_type TEXT');
  }
  const hasLog = await hasColumn(db, 'article_enrichments', 'log');
  if (!hasLog) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN log TEXT');
  }
  const hasSummary = await hasColumn(db, 'article_enrichments', 'summary');
  if (!hasSummary) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN summary TEXT');
  }
  const hasSector = await hasColumn(db, 'article_enrichments', 'sector');
  if (!hasSector) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN sector TEXT');
  }
  const hasCurrency = await hasColumn(db, 'article_enrichments', 'currency');
  if (!hasCurrency) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN currency TEXT');
  }
  const hasAboutAcq = await hasColumn(
    db,
    'article_enrichments',
    'about_acquiror'
  );
  if (!hasAboutAcq) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN about_acquiror TEXT');
  }
  const hasAboutSeller = await hasColumn(
    db,
    'article_enrichments',
    'about_seller'
  );
  if (!hasAboutSeller) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN about_seller TEXT');
  }
  const hasAboutTarget = await hasColumn(
    db,
    'article_enrichments',
    'about_target'
  );
  if (!hasAboutTarget) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN about_target TEXT');
  }
  const hasAcqHq = await hasColumn(db, 'article_enrichments', 'acquiror_hq');
  if (!hasAcqHq) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN acquiror_hq TEXT');
  }
  const hasSellerHq = await hasColumn(db, 'article_enrichments', 'seller_hq');
  if (!hasSellerHq) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN seller_hq TEXT');
  }
  const hasTargetHq = await hasColumn(db, 'article_enrichments', 'target_hq');
  if (!hasTargetHq) {
    await db.run('ALTER TABLE article_enrichments ADD COLUMN target_hq TEXT');
  }

  await configDb.run(`CREATE TABLE IF NOT EXISTS sources (
    id ${configIdColumn},
    base_url TEXT,
    article_selector TEXT,
    title_selector TEXT,
    description_selector TEXT,
    time_selector TEXT,
    link_selector TEXT,
    image_selector TEXT,
    body_selector TEXT,
    location_selector TEXT,
    date_selector TEXT
  )`);

  const hasBodySel = await hasColumn(configDb, 'sources', 'body_selector');
  if (!hasBodySel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN body_selector TEXT');
  }
  const hasLocationSel = await hasColumn(
    configDb,
    'sources',
    'location_selector'
  );
  if (!hasLocationSel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN location_selector TEXT');
  }
  const hasDateSel = await hasColumn(configDb, 'sources', 'date_selector');
  if (!hasDateSel) {
    await configDb.run('ALTER TABLE sources ADD COLUMN date_selector TEXT');
  }

  const row = await configDb.get('SELECT COUNT(*) as count FROM sources');
  if (row.count === 0) {
    const insert = `INSERT INTO sources
        (base_url, article_selector, title_selector, description_selector,
         time_selector, link_selector, image_selector, body_selector,
         location_selector, date_selector)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await configDb.run(insert, [
      'https://www.newswire.ca/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/?page=1&pagesize=100',
      'div.card',
      'h3',
      'p',
      'h3 small',
      'a.newsreleaseconsolidatelink',
      null,
      '#release-body',
      'span.xn-location',
      'span.xn-chron'
    ]);
  }
}

module.exports = initDb;
