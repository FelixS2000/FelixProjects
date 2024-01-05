const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection(config);

module.exports = {
  connect: () => {
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
    });
  },
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
