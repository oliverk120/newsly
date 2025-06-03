const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all filters
router.get('/', (req, res) => {
  db.all('SELECT * FROM filters', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve filters' });
    }
    res.json(rows);
  });
});

// Add a filter
router.post('/', (req, res) => {
  const { name, type, value, active = 1 } = req.body;
  db.run(
    'INSERT INTO filters (name, type, value, active) VALUES (?, ?, ?, ?)',
    [name, type, value, active],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add filter' });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a filter
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, type, value, active } = req.body;
  db.run(
    'UPDATE filters SET name = ?, type = ?, value = ?, active = ? WHERE id = ?',
    [name, type, value, active, id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update filter' });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a filter
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM filters WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete filter' });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
