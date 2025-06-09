const express = require('express');
const configDb = require('../configDb');
const { getPrompt, setPrompt } = require('../lib/prompts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await configDb.all('SELECT name, template, fields FROM prompts');
    const mapped = rows.map(r => ({
      name: r.name,
      template: r.template,
      fields: r.fields ? r.fields.split(',').map(f => f.trim()).filter(Boolean) : []
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prompts' });
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const prompt = await getPrompt(configDb, name);
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' });
    res.json({ name, template: prompt.template, fields: prompt.fields });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prompt' });
  }
});

router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { template, fields = [] } = req.body;
  try {
    const changes = await setPrompt(configDb, name, template, fields);
    res.json({ updated: changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

module.exports = router;
