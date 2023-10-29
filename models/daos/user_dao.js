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
    console.log("In the DAO!!!");
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results[0]);
        }
      });
    });
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