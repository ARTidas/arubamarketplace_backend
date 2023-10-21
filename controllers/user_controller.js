const express = require('express');
const router = express.Router();
const userDao = require('../models/daos/user_dao'); // Példa adatkapcsolat-kezelő modul

router.get('/users', async (req, res) => {
  try {
    // Lekérjük a felhasználókat az adatbázisból a userDao segítségével
    const users = await userDao.getUsers();

    // JSON formátumban küldjük a felhasználókat a válaszban
    res.json(users);
  } catch (err) {
    console.error('Nem sikerült lekérdezni a felhasználókat. Hiba:', err);
    res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
  }
});

module.exports = router;
