const db = require('../bos/mysql_database_connection_bo');

function getProducts() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hck_product', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getProductById(productId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hck_product WHERE hct_product.id = ', [`%${productId}%`],  (err, results) => {
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
    db.query('SELECT * FROM hck_product WHERE title LIKE ?', [`%${searchTerm}%`], (err, results) => {
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