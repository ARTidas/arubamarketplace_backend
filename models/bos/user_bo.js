const userDao = require('../daos/user_dao');
const bcrypt = require('bcrypt'); // For password hashing

const userBo = {
    // Function for get all users user
    getAll: async () => {
        try {
            const users = await userDao.getAll();

            return users;
        } catch (error) {
            throw error;
        }
    },

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

    // Function for email validation
    isEmailValid: async (email) => {
        // Check the format of the email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    },
    
    // Function for password validation
    isPasswordValid: async (password, passwordConfirmation) => {
        // Check that the passwords are the same
        return password === passwordConfirmation;
    },
    
    // Function for user registration
    registerUser: async (email, password, passwordConfirmation) => {
        if (!isEmailValid(email)) {
          throw new Error('Invalid email address');
        }
      
        if (!isPasswordValid(password, passwordConfirmation)) {
          throw new Error('The passwords are not the same.');
        }
      
        // Calling DAO to create a new user
        return userDao.createUser(email, password);
      }

    // Other user-related functions (e.g., registration, profile update) can be defined here
};

module.exports = userBo;