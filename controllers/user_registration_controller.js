// user_register_controller.js
const express = require('express');
const router = express.Router();
const userBo = require('../models/bo/user_register_bo');

router.post('/register', async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;

    try {
        const message = await userBo.registerUser(username, email, password, passwordConfirmation);
        res.status(201).json({ message });} 
    catch (error) {
            res.status(400).json({ error: error.message });
