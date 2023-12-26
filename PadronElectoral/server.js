// server.js

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer(); 

const app = express();

// MySQL connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Felix1729!2020',
  database: 'electoral'
});

// Connect to database
db.connect();

// API endpoint to save voter
app.post('/api/voters', upload.single('photo'), (req, res) => {

  let { name, age, gender, address } = req.body;

  // Insert voter data
  let insertQuery = `
    INSERT INTO voters(name, age, gender, address, photo)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [name, age, gender, address, req.file.buffer], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Voter added successfully!');
  });

});

app.listen(3000, () => {
  console.log('Server listening on port 3000'); 
});

// GET /api/voters
app.get('/api/voters', (req, res) => {
  // query DB and return voters
  const voters = []; 
  res.json(voters);
});
