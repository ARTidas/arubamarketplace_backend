const dbConnectionController = require('../bos/mysql_database_connection_bo');

const userDao = {
  // Function to get all user data
  getAll: async () => {
    try {
        const query = 'SELECT * FROM hck.users';
        const values = [email];
        const { rows } = await db.query(query, values);

        if (rows.length === 0) {
            return null; // No user found
            console.log("User not found . . . . .");
        }

        return rows; // Return the first user found (assuming email is unique)
    } catch (error) {
        throw error; // Handle database query errors
    }
  },
  // Function to get user data by email
  getUserByEmail: async (email) => {
      try {
          const query = 'SELECT * FROM hck.users WHERE email = $1';
          const values = [email];
          const { rows } = await db.query(query, values);

          if (rows.length === 0) {
              return null; // User not found
              console.log("User not found . . . . .");
          }

          return rows[0]; // Return the first user found (assuming email is unique)
      } catch (error) {
          throw error; // Handle database query errors
      }
  },

  // Function to create a new user
  createUser: async (userData) => {
      try {
          const { email, password, /* other user data */ } = userData;
          const query = 'INSERT INTO hck.users (email, password, /* other columns */) VALUES ($1, $2, /* other values */) RETURNING *';
          const values = [email, password, /* other values */];
          const { rows } = await db.query(query, values);

          return rows[0]; // Return the newly created user
      } catch (error) {
          throw error; // Handle database query errors
      }
  },

  // Other user-related database operations can be defined here
};

module.exports = userDao;

/*function getUsers() {
    return new Promise((resolve, reject) => {
      dbConnectionController.query('SELECT * FROM users', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }*/