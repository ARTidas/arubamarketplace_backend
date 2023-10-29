// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const userBo = require('../models/bos/user_bo'); // Import the user business object

// Define a route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Into the backlands");
    console.log(email);
    console.log(password);

    try {
        const user = await userBo.login(email, password);

        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;