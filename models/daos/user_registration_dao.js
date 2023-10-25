// user_register_dao.js
const dbConnectionController = require('../bos/mysql_database_connection_bo');

function createUser(username, email, password) {
  return new Promise((resolve, reject) => {
    // Hash-eljük a jelszót itt (példa: bcrypt használata ajánlott)
    const hashedPassword = hashPassword(password);

    const query = 'INSERT INTO hck_users (email, password_hash) VALUES (?, ?)';
    dbConnectionController.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve('Sikeres regisztráció.');
      }
    });
  });
}

module.exports = {
  createUser,
};
