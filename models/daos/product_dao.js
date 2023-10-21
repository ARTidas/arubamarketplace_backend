const db = require('../bos/mysql_database_connection_bo');

function getProducts() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hct_product', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getProducts,
};