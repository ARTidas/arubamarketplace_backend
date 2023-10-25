// user_registration_controller.js
const express = require('express');
const router = express.Router();
const userBo = require('./user_bo');

router.post('/register', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  try {
    const message = await userBo.registerUser(email, password, passwordConfirmation);
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }});
