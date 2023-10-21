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

module.exports = router;
