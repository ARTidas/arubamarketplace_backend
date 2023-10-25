module.exports = {};

const userDao = require('../daos/user_dao');
const bcrypt = require('bcrypt'); // For password hashing

const userBo = {
    // Function for user login
    login: async (email, password) => {
        try {
            // Retrieve user data by email from the DAO
            const user = await userDao.getUserByEmail(email);

            if (!user) {
                return null; // User not found
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                return user; // Successful login
            } else {
                return null; // Invalid password
            }
        } catch (error) {
            throw error; // Handle errors appropriately
        }
    },

    // Other user-related functions (e.g., registration, profile update) can be defined here
};

module.exports = userBo;