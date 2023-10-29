const express = require('express');
const router = express.Router();
const userBo = require('../models/bos/user_bo');

router.get('/users', async (req, res) => {
  try {

    const users = await userBo.getAll();


    res.json(users);
  } catch (err) {
    console.error('Failed to query users. Fault:', err);
    res.status(500).json({ error: 'Error while retreving data' });
  }
});

module.exports = router;