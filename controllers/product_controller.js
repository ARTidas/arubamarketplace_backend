const express = require('express');
const router = express.Router();
const productBo = require('../models/bos/product_bo');

router.get('/products', async (req, res) => {
  try {
    const products = await productBo.getProducts();
    res.json(products);
  } catch (err) {
    console.error('Nem sikerült lekérdezni a termékeket. Hiba:', err);
    res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
  }
});

router.get('/products/search', async (req, res) => {
  const { searchTerm } = req.query; // A keresési kifejezés, amit a frontend küld

  try {
    const products = await productBo.getProductsByName(searchTerm);
    //console.error();
    // JSON formátumban küldjük vissza a talált termékeket
    res.json(products);
  } catch (err) {
    console.error('Hiba a termékek keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

router.get('/products/category', async (req, res) => {
  const { categoryName } = req.params; // Extract the products category from the URL

  try {
    const products = await productBo.getProductsByCategoryName(categoryName);

    // Send the products as a JSON response
    res.json(products);
  } catch (err) {
    console.error('Hiba a termékek keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params; // Extract the product ID from the URL

  try {
    const product = await productBo.getProductById(id);

    // Send the product as a JSON response
    res.json(product);
  } catch (err) {
    console.error('Hiba a termék keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

module.exports = router;