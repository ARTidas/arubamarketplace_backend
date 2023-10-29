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
        console.error(id);
        console.error(err);
        console.error(result);
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
  
  getProductsByName: async (search) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hct_product WHERE title LIKE ?', [`%${search}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getProductsByCategoryName: async (category) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hct_product WHERE category = ?', [category], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          reject(new Error('Products not found'));
        } else {
          resolve(results);
        }
      });
    });
  },

  getUniqueCategoryNames: async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT DISTINCT category FROM hct_product', (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          reject(new Error('No category found.'));
        } else {
          resolve(results);
        }
      });
    });
  },

  createProduct: async (title, description, price) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO hct_product (title, price, description, owners, img) VALUES (?, ?, ?, ?, ?)';
      const values = [title, price, description, owners, img];

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
}

module.exports = productDao;