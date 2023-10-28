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

router.get('/products/search/:search', async (req, res) => {
  const { search } = req.params; // A keresési kifejezés, amit a frontend küld

  try {
    const products = await productBo.getProductsByName(search);
    const products_id = [];
    const products_title = [];

    products.forEach(element => {
      products_id.push(element.id);
      products_title.push(element.title);
    });

    const responseData = {
      productIds: products_id,
      productTitles: products_title,
    };

    // JSON formátumban küldjük vissza a talált termékeket
    res.json(responseData);
  } catch (err) {
    console.error('Hiba a termékek keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

router.get('/products/categories', async (req, res) => {
  try {
    const categories = await productBo.getUniqueCategoryNames();

    // Send the categories as a JSON response
    res.json(categories);
  } catch (err) {
    console.error('Hiba a kategóriák keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

router.get('/products/category/:category', async (req, res) => {
  const { category } = req.params; // Extract the products category from the URL

  console.log(category);

  try {
    const products = await productBo.getProductsByCategoryName(category);

    // Send the products as a JSON response
    res.json(products);
  } catch (err) {
    console.error('Hiba a termékek keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

router.get('/products/id/:id', async (req, res) => {
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

// Create a new product
router.post('/products/create', async (req, res) => {
  const { title, price, description, owners, img } = req.body;

  try {
    const productId = await productBo.createProduct(title, price, description, owners, img);
    res.status(201).json({ id: productId, message: 'Product created successfully' });
  } catch (err) {
    console.error('Hiba a termék létrehozása során:', err);
    res.status(500).json({ error: 'Hiba a termék létrehozása során' });
  }
});

module.exports = router;