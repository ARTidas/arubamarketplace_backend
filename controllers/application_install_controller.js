const express = require('express');
const router = express.Router();
const applicationInstallBo = require('../models/bos/application_install_bo');

router.post('/installations', (req, res) => {
  const { name, description } = req.body;

  try {
    const installation = applicationInstallBo.install(name, description);
    res.status(201).json(installation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/installations', (req, res) => {
  const installations = applicationInstallBo.listInstallations();
  res.status(200).json(installations);
});

module.exports = router;
