const mysql = require('mysql2');

/*const dbPool = mysql.createPool({
  host: 'mariadb11.viacomkft.hu',
  database: '16153_theapp',
  user: '16153_theapp',
  password: 'LyOOiFoEM7giE',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
dbPool.promise().getConnection()
  .then((connection) => {
    console.log('Connection to the database is successful.');
    connection.release();
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

module.exports = dbPool.promise();*/

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