const express = require('express');
const router = express.Router();
const userBo = require('../models/bos/user_bo');

router.get('/users', async (req, res) => {
  try {
    // Lekérjük a felhasználókat az adatbázisból a userBo segítségével
    const users = await userBo.getAll();

    // JSON formátumban küldjük a felhasználókat a válaszban
    res.json(users);
  } catch (err) {
    console.error('Nem sikerült lekérdezni a felhasználókat. Hiba:', err);
    res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
  }
});

module.exports = router;