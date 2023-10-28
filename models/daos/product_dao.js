//const dbPool = require('../bos/mysql_database_connection_bo');
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

  /*getProductsByName: async (search) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM hct_product WHERE title LIKE ?';
      db.query(query, ['%${search}%'], (error, results) => {
        if (error) {
          return reject(error);
        }

        return resolve(results);
      })
    });
  },*/

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
  }

  /*getProducts: async () => {
    try {
      const connection = await dbPool.getConnection();
      const [results] = await connection.query('SELECT * FROM hct_product');
      connection.release(); // Release the connection back to the pool when done
      return results;
    } catch (err) {
      throw err;
    }
  },

  getProductById: async (id) => {
    try {
      const connection = await dbPool.getConnection();
      const [results] = await connection.query('SELECT * FROM hct_product WHERE id = ?', [id]);
      connection.release(); // Release the connection back to the pool when done
      return results;
    } catch (err) {
      throw err;
    }
  },
  
  getProductsByName: async (searchTerm) => {
    try {
      const connection = await dbPool.getConnection();
      const [results] = await connection.query('SELECT * FROM hct_product WHERE title LIKE ?', [`%${searchTerm}%`]);
      connection.release(); // Release the connection back to the pool when done
      return results;
    } catch (err) {
      throw err;
    }
  }*/
}

module.exports = productDao;