// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const userBo = require('../models/bos/user_bo'); // Import the user business object

// Define a route for user login
router.post('/log', async (req, res) => {
    const { email, password } = req.body;

    console.log("Into the backlands");
    console.log(email);
    console.log(password);

     // Ellenőrizd az email és jelszó egyezését
  const result = await userBo.comparePassword(email, password);
  if (result) {
    res.status(200).json({ message: 'Sikeres bejelentkezés' });
  } else {
    res.status(401).json({ message: 'Sikertelen bejelentkezés' });
  }
});

module.exports = router;