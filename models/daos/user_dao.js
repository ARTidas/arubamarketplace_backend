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
          const { email, password} = userData;
          const query = 'INSERT INTO hck.users (email, password) VALUES ($1, $2) RETURNING *';
          const values = [email, password];
          const { rows } = await db.query(query, values);

          return rows[0]; // Return the newly created user
      } catch (error) {
          throw error; // Handle database query errors
      }
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