const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'padronElectoral',
    port: 3306
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

app.post('/register', upload.single('image'), (req, res) => {
    try {
        const fname = req.body.fname;
        const gender = req.body.gender;
        const age = req.body.age;
        const location = req.body.location;
        const image = req.file.path;

        // Assuming you have a MySQL database connection (as in your original code)
        // Insert the form data into the database
        let sql = `INSERT INTO voters (fname, gender, age, location, image) VALUES (?, ?, ?, ?, ?)`;
        let query = db.query(sql, [fname, gender, age, location, image], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: 'Registro Exitoso' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});