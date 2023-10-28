const applicationInstallDo = require('../dos/application_install_do');

const installations = []; // Példa adatbázis

function createInstallation(name, description) {
  const id = installations.length + 1;
  const installation = new applicationInstallDo(id, name, description);
  installations.push(installation);
  return installation;
}

function getInstallations() {
  return installations;
}

module.exports = { createInstallation, getInstallations };
