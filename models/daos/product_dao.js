const db = require('../bos/mysql_database_connection_bo');

const productDao = {
  getProducts: async () =>{
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hct_product', (err, results) => {
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
      db.query('SELECT * FROM hct_product WHERE id = ?', [id], (err, result) => {
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
      db.query('SELECT * FROM hct_product WHERE title LIKE ?', [`%${searchTerm}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /*getProducts: async () => {
    try {
      const [results, fields] = await db.query('SELECT * FROM hct_product');
      return results;
    } catch (err) {
      throw err;
    }
  },

  getProductById: async (id) => {
    try {
      const [results, fields] = await db.query('SELECT * FROM hct_product WHERE hct_product.id = ' + id);
      return results;
    } catch (err) {
      throw err;
    }
  },
  
  getProductsByName: async (searchTerm) => {
    try {
      const [results, fields] = await db.query('SELECT * FROM hct_product WHERE hct_product.title LIKE %' + searchTerm + '%');
      return results;
    } catch (err) {
      throw err;
    }
  }*/
}

module.exports = productDao;