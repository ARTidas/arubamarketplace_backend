const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mariadb11.viacomkft.hu',
  database: '16153_theapp',
  user: '16153_theapp',                            
  password: 'LyOOiFoEM7giE'         
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Connection to the database is successful.');
  }
});

module.exports = db;
