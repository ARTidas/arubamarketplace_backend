const express = require('express');
const router = express.Router();
const productDao = require('../models/daos/product_dao');

router.get('/products', async (req, res) => {
  try {
    const products = await productDao.getProducts();
    res.json(products);
  } catch (err) {
    console.error('Nem sikerült lekérdezni a termékeket. Hiba:', err);
    res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
  }
});


router.get('/products/search', async (req, res) => {
  const { searchTerm } = req.query; // A keresési kifejezés, amit a frontend küld

  try {
    const products = await productDao.searchProductsByName(searchTerm);

    // JSON formátumban küldjük vissza a talált termékeket
    res.json(products);
  } catch (err) {
    console.error('Hiba a termékek keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

module.exports = router;
