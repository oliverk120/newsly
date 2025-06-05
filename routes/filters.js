const express = require('express');
const configDb = require('../configDb');

const router = express.Router();

// Get all filters
router.get('/', async (req, res) => {
  try {
    const rows = await configDb.all('SELECT * FROM filters');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve filters' });
  }
});

// Add a filter
router.post('/', async (req, res) => {
  const { name, type, value, active = 1 } = req.body;
  try {
    const result = await configDb.run(
      'INSERT INTO filters (name, type, value, active) VALUES (?, ?, ?, ?)',
      [name, type, value, active]
    );
    res.json({ id: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add filter' });
  }
});

// Update a filter
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, value, active } = req.body;
  try {
    const result = await configDb.run(
      'UPDATE filters SET name = ?, type = ?, value = ?, active = ? WHERE id = ?',
      [name, type, value, active, id]
    );
    res.json({ updated: result.changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update filter' });
  }
});

// Delete a filter
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await configDb.run('DELETE FROM filters WHERE id = ?', [id]);
    res.json({ deleted: result.changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete filter' });
  }
});

module.exports = router;
