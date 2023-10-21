const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'xxx',
  database: 'xxx',
  user: 'xxx',                              //TODO: Create a secret retreval process...
  password: 'xxx'                           //TODO: Create a secret retreval process...
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Connection to the database is successful.');
  }
});

module.exports = db;
