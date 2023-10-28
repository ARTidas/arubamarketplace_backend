const db = require('../bos/mysql_database_connection_bo');

const applicationInstallDao = {
  insertClickToDatabase: async (userId, nodeId, status, version) => {
    const insertQuery = 'INSERT INTO hck_application_install (user_id, node_id, status, version) VALUES (?, ?, ?, ?)';
    const values = [userId, nodeId, status, version];
    return db.query(insertQuery, values);
  },

  listInstallations: async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hck_application_install', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = applicationInstallDao;