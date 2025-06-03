const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all scraping sources
router.get('/', (req, res) => {
  db.all('SELECT * FROM sources', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve sources' });
    }
    res.json(rows);
  });
});

// Add a new scraping source
router.post('/', (req, res) => {
  const {
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector
  ];

  db.run(
    `INSERT INTO sources (base_url, article_selector, title_selector, description_selector, time_selector, link_selector, image_selector, body_selector)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    params,
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add source' });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Delete a scraping source
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM sources WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete source' });
    }
    res.json({ deleted: this.changes });
  });
});

// Update a scraping source
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector,
  } = req.body;

  const params = [
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector,
    id,
  ];

  db.run(
    `UPDATE sources SET base_url = ?, article_selector = ?, title_selector = ?, description_selector = ?, time_selector = ?, link_selector = ?, image_selector = ?, body_selector = ? WHERE id = ?`,
    params,
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update source' });
      }
      res.json({ updated: this.changes });
    }
  );
});

module.exports = router;
