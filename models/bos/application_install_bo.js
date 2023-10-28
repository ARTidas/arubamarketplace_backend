const applicationInstallDao = require('../daos/application_install_dao');

const applicationInstallBo = {
  handleUserClick: async (nodeId, decision, userId, status, version) => {
    if (!nodeId || !userId || decision !== 'Yes' && decision !== 'No') {
      throw new Error('Érvénytelen adatok vagy döntés.');
    }

    // Döntés kezelése
    // Példa: Az alábbi sor a függvénytől függően változhat
    const result = applicationInstallDao.insertClickToDatabase(userId, nodeId, status, version);

    if (result) {
      // Sikeres adatbázisba írás
      return result;
    } else {
      throw new Error('Hiba az adatbázisba írás során.');
    }
  },

  listInstallations: async () => {
    try {
        const installations = await applicationInstallDao.listInstallations();
        return installations;
    } catch (error) {
        throw error;
    }
  }
}

module.exports = applicationInstallBo;