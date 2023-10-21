const dbConnectionController = require('../bos/mysql_database_connection_bo');


// ...

function getUsers() {
  return new Promise((resolve, reject) => {
    dbConnectionController.query('SELECT * FROM users', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getUsers,
};
