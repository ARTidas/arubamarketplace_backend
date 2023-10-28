const db = require('../bos/mysql_database_connection_bo');

const userDao = {
  // Function to get all user data
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hck_users', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Function to get user data by email
  getUserByEmail: async (email) => {
      try {
          const query = 'SELECT * FROM hck_users WHERE email = $1';
          const values = [email];
          const { rows } = await db.query(query, values);

          if (rows.length === 0) {
              return null; // User not found
          }

          return rows[0]; // Return the first user found (assuming email is unique)
      } catch (error) {
          throw error; // Handle database query errors
      }
  },

  // Function to create a new user

  createUser: async (userData, callback) => {
    const query = 'INSERT INTO hck_users (email, password_hash, is_active, created_at, is_admin, owned_products_id, balance, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      userData.email,
      userData.password_hash,
      userData.is_active,
      userData.created_at,
      userData.is_admin,
      userData.owned_products_id,
      userData.balance,
      userData.updated_at,
    ];
  
    // Execute the insert query
    db.query(query, values, (queryError, results) => {

      if (queryError) {
        callback(queryError, null);
      } else {
        // Return the ID of the newly created user
        callback(null, results.insertId);
      }
    });
  }

  /*// Function to create a new user
  createUser: async (email, password) => {
    return new Promise((resolve, reject) => {
      // Hash-eljük a jelszót itt (példa: bcrypt használata ajánlott)
      const hashedPassword = hashPassword(password);
  
      const query = 'INSERT INTO hck_users (email, password_hash) VALUES (?, ?)';
      dbConnectionController.query(query, [ email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve('Sikeres regisztráció.');
        }
      });
    });
  }*/

  // Other user-related database operations can be defined here
};

module.exports = userDao;