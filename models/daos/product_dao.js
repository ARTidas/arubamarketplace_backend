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

function getProductsById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hct_product WHERE hct_product.id = ', ['%${id}%'],  (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function searchProductsByName(searchTerm) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hct_product WHERE title LIKE ?', [`%${searchTerm}%`], (err, results) => {
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
  getProductsById,
  getProductsByCategory,
  searchProductsByName,
};