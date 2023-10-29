// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const userBo = require('../models/bos/user_bo'); // Import the user business object

// Define a route for user login
router.post('/log', async (req, res) => {
    const { email, password } = req.body;


  const result = await userBo.comparePassword(email, password);
  console.log("Result");
  console.log(result);
  if (result) {
    res.status(200).json({ message: 'Succesful login' });
  } else {
    res.status(401).json({ message: 'Unsuccesful login' });
  }
});

module.exports = router;