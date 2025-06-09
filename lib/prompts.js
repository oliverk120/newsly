async function getPrompt(db, name, defaultTemplate, defaultFields = []) {
  const row = await db.get('SELECT template, fields FROM prompts WHERE name = ?', [name]);
  if (row && row.template) {
    return {
      template: row.template,
      fields: row.fields ? row.fields.split(',').map(f => f.trim()).filter(Boolean) : []
    };
  }
  if (defaultTemplate !== undefined) {
    const sql = db.raw && db.raw.getDialect && db.raw.getDialect() === 'postgres'
      ? 'INSERT INTO prompts (name, template, fields) VALUES (?, ?, ?) ON CONFLICT DO NOTHING'
      : 'INSERT OR IGNORE INTO prompts (name, template, fields) VALUES (?, ?, ?)';
    await db.run(sql, [name, defaultTemplate, defaultFields.join(',')]);
    return { template: defaultTemplate, fields: defaultFields };
  }
  return null;
}

async function setPrompt(db, name, template, fields = []) {
  const result = await db.run(
    `INSERT INTO prompts (name, template, fields) VALUES (?, ?, ?)
       ON CONFLICT(name) DO UPDATE SET template = excluded.template, fields = excluded.fields`,
    [name, template, Array.isArray(fields) ? fields.join(',') : fields]
  );
  return result.changes;
}

module.exports = { getPrompt, setPrompt };
