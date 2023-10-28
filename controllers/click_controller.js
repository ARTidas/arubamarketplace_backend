const express = require('express');
const router = express.Router();
const applicationInstallBo = require('../models/bos/application_install_bo');

router.post('/click', (req, res) => {
  const { nodeId, decision } = req.body;
  const userId = req.user.id; // Példa: felhasználó azonosítás

  try {
    applicationInstallBo.handleUserClick(nodeId, decision, userId);
    res.status(201).json({ message: 'Kattintás elmentve.' });
  } catch (error) {
    console.error('Hiba a kattintás elmentése során:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
