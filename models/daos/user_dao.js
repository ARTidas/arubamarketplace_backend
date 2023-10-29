const db = require('../bos/mysql_database_connection_bo');
const userDo = require('../dos/user_do');

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

  emailExist: async (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hck_users WHERE email = ?', [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  },

  saveUser: async (userDo) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hck_users (email, password_hash) VALUES (?, ?)', [userDo.email, userDo.password_hash], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
};

module.exports = userDao;