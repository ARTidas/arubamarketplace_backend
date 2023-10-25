// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const userBo = require('../bos/user_bo'); // Import the user business object

// Define a route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Call the business object to handle login logic
        const user = await userBo.login(email, password);

        if (user) {
            // Successful login
            // You can generate a JWT token here and send it as a response for future authenticated requests.
            // For now, let's just send a success message.
            res.json({ message: 'Login successful' });
        } else {
            // Invalid credentials
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle errors, e.g., database connection error, etc.
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;