const express = require('express');
const app = express();
const mysql = require('mysql');

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Felix1729!2020',
  database: 'voters'
});

// Connect to DB
db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Express config
app.use(express.json());

// Get all voters
app.get('/api/voters', (req, res) => {
  const sql = 'SELECT * FROM voters';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add new voter
app.post('/api/voters', (req, res) => {
  const sql = 'INSERT INTO voters SET ?';
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    res.json(req.body); // Return added voter object
  });
});

const voterRoutes = require('./api/voters');

app.use('/api/voters', voterRoutes)

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));