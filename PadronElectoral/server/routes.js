const express = require('express');
const database = require('./database');

const router = express.Router();

router.get('/voters', async (req, res) => {
  try {
    const results = await database.query('SELECT * FROM voters');
    res.json(results);
  } catch (error) {
    console.error('Error fetching voters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes as needed

module.exports = router;
