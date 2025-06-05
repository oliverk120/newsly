const express = require('express');
const configDb = require('../configDb');
const { getPrompt, setPrompt } = require('../lib/prompts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await configDb.all('SELECT name, template FROM prompts');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prompts' });
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const template = await getPrompt(configDb, name);
    if (!template) return res.status(404).json({ error: 'Prompt not found' });
    res.json({ name, template });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prompt' });
  }
});

router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { template } = req.body;
  try {
    const changes = await setPrompt(configDb, name, template);
    res.json({ updated: changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

module.exports = router;
