const applicationInstallDao = require('../daos/application_install_dao');

function handleUserClick(nodeId, decision) {
  if (!nodeId) {
    throw new Error('Hiányzó node ID.');
  }

  // Validáció és üzleti logika
  if (decision === 'Yes') {
    // Döntés kezelése, ha 'Yes'
    // Példa: applicationInstallDao.createInstallation(name, description);
  } else if (decision === 'No') {
    // Döntés kezelése, ha 'No'
    // Példa: applicationInstallDao.createInstallation(name, description);
  } else {
    throw new Error('Érvénytelen döntés.');
  }
}

module.exports = { handleUserClick };
