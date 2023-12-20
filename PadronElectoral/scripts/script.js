const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Felix1729!2020',
    database: 'padronelectoral',
    port: 3306,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // Assuming your HTML file is in a 'public' folder

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Fetch voters from the API
app.get('/api/voters', (req, res) => {
    pool.query('SELECT * FROM voters', (error, results) => {
        if (error) {
            console.error('Error fetching voters:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// Register a new voter
app.post('/api/voters', (req, res) => {
    const { nombre, cedula, pasaporte, habilitado } = req.body;

    // Assuming you have a 'voters' table with columns 'nombre', 'cedula', 'pasaporte', 'habilitado'
    pool.query(
        'INSERT INTO voters (nombre, cedula, pasaporte, habilitado) VALUES (?, ?, ?, ?)',
        [nombre, cedula, pasaporte, habilitado],
        (error, results) => {
            if (error) {
                console.error('Error registering voter:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Fetch updated voter list
                pool.query('SELECT * FROM voters', (error, updatedResults) => {
                    if (error) {
                        console.error('Error fetching voters after registration:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.json(updatedResults);
                    }
                });
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
