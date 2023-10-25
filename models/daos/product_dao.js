const db = require('../bos/mysql_database_connection_bo');

const productDao = {
  getProducts: async () =>{
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hck_product', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getProductById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hck_product WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject(new Error('Product not found'));
        } else {
          resolve(result[0]);
        }
      });
    });
  },
  
  getProductsByName: async (searchTerm) => {
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
}

module.exports = productDao;