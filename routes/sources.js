const express = require('express');
const configDb = require('../configDb');

const router = express.Router();

// Get all scraping sources
router.get('/', async (req, res) => {
  try {
    const rows = await configDb.all('SELECT * FROM sources');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve sources' });
  }
});

// Add a new scraping source
router.post('/', async (req, res) => {
  const {
    base_url,
    article_selector,
    title_selector,
    description_selector,
    time_selector,
    link_selector,
    image_selector,
    body_selector,
    location_selector,
    date_selector
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
    location_selector,
    date_selector
  ];

  try {
    const result = await configDb.run(
      `INSERT INTO sources (base_url, article_selector, title_selector, description_selector, time_selector, link_selector, image_selector, body_selector, location_selector, date_selector)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params
    );
    res.json({ id: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add source' });
  }
});

// Delete a scraping source
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await configDb.run('DELETE FROM sources WHERE id = ?', [id]);
    res.json({ deleted: result.changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete source' });
  }
});

// Duplicate a scraping source
router.post('/:id/duplicate', async (req, res) => {
  const { id } = req.params;
  try {
    const source = await configDb.get('SELECT * FROM sources WHERE id = ?', [id]);
    if (!source) return res.status(404).json({ error: 'Source not found' });
    const params = [
      source.base_url,
      source.article_selector,
      source.title_selector,
      source.description_selector,
      source.time_selector,
      source.link_selector,
      source.image_selector,
      source.body_selector,
      source.location_selector,
      source.date_selector,
    ];
    const result = await configDb.run(
      `INSERT INTO sources (base_url, article_selector, title_selector, description_selector, time_selector, link_selector, image_selector, body_selector, location_selector, date_selector)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params
    );
    res.json({ id: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to duplicate source' });
  }
});

// Update a scraping source
router.put('/:id', async (req, res) => {
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
    location_selector,
    date_selector,
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
    location_selector,
    date_selector,
    id,
  ];

  try {
    const result = await configDb.run(
      `UPDATE sources SET base_url = ?, article_selector = ?, title_selector = ?, description_selector = ?, time_selector = ?, link_selector = ?, image_selector = ?, body_selector = ?, location_selector = ?, date_selector = ? WHERE id = ?`,
      params
    );
    res.json({ updated: result.changes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update source' });
  }
});

module.exports = router;
