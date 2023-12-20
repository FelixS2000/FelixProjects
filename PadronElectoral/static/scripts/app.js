const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // MySQL server host address
    user: 'root', // MySQL server username
    password: 'your_password', // MySQL server password
    database: 'your_database' // Your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});