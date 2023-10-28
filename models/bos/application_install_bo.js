const applicationInstallDao = require('../daos/application_install_dao');

function install(name, description) {
  // Validáció és üzleti logika
  if (!name || !description) {
    throw new Error('Név és leírás megadása kötelező.');
  }

  return applicationInstallDao.createInstallation(name, description);
}

function listInstallations() {
  return applicationInstallDao.getInstallations();
}

module.exports = { install, listInstallations };
