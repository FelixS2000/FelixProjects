const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Felix1729!2020',
    database: 'padronElectoral',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/addVoter', (req, res) => {
    res.sendFile(__dirname + '/FelixProjects/addVoter.html');
});

app.post('/addVoter', (req, res) => {
    const { name, age, address } = req.body;
    const query = 'INSERT INTO voters (name, age, address) VALUES (?, ?, ?)';
    connection.query(query, [name, age, address], (err, result) => {
        if (err) throw err;
        res.send('Voter added successfully!');
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
