const appInstallDao = require('../daos/application_install_dao');

function handleUserClick(nodeId, decision, userId, status, version) {
  if (!nodeId || !userId || decision !== 'Yes' && decision !== 'No') {
    throw new Error('Érvénytelen adatok vagy döntés.');
  }

  // Döntés kezelése
  // Példa: Az alábbi sor a függvénytől függően változhat
  const result = appInstallDao.insertClickToDatabase(userId, nodeId, status, version);

  if (result) {
    // Sikeres adatbázisba írás
    return result;
  } else {
    throw new Error('Hiba az adatbázisba írás során.');
  }
}

module.exports = { handleUserClick };