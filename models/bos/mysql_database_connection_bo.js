const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: 'mariadb11.viacomkft.hu',
  database: '16153_theapp',
  user: '16153_theapp',
  password: 'LyOOiFoEM7giE',
  connectionLimit: 10, // Adjust the connection limit as needed
});

// Attempt to get a connection from the pool to test the database connection
dbPool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connection to the database is successful.');

    // Release the connection back to the pool
    connection.release();
  }
});

// You can access connections from the pool as needed.

module.exports = dbPool.promise(); // Return a promise-based pool for async/await

/*const mysql = require('mysql2');

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

module.exports = db;*/