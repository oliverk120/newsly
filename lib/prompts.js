async function getPrompt(db, name, defaultTemplate) {
  const row = await db.get('SELECT template FROM prompts WHERE name = ?', [name]);
  if (row && row.template) return row.template;
  if (defaultTemplate !== undefined) {
    await db.run(
      'INSERT OR IGNORE INTO prompts (name, template) VALUES (?, ?)',
      [name, defaultTemplate]
    );
    return defaultTemplate;
  }
  return null;
}

async function setPrompt(db, name, template) {
  const result = await db.run(
    `INSERT INTO prompts (name, template) VALUES (?, ?)
       ON CONFLICT(name) DO UPDATE SET template = excluded.template`,
    [name, template]
  );
  return result.changes;
}

module.exports = { getPrompt, setPrompt };
