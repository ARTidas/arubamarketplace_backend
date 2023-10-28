const db = require('../bos/mysql_database_connection_bo');

function insertClickToDatabase(userId, nodeId, status, version) {
  const insertQuery = 'INSERT INTO hck_application_install (user_id, node_id, status, version) VALUES (?, ?, ?, ?)';
  const values = [userId, nodeId, status, version];
  return db.query(insertQuery, values);
}

module.exports = { insertClickToDatabase };
