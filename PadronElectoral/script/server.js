const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for handling the uploaded image file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Configure MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Felix1729!2020',
    database: 'padronElectoral',
    port: 3306
});
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/register', upload.single('image'), (req, res) => {
    const fname = req.body.fname;
    const gender = req.body.gender;
    const age = req.body.age;
    const location = req.body.location;
    const image = req.file.path;

    let sql = `INSERT INTO voters (fname, gender, age, location, image) VALUES (?, ?, ?, ?, ?)`;
    let query = db.query(sql, [fname, gender, age, location, image], (err, result) => {
        if (err) throw err;
        res.send('Registro Exitoso');
    });
});

app.listen('3000', () => {
    console.log('Server is running at port 3000');
});