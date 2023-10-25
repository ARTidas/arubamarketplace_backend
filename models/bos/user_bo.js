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

    // Function for email validation
    isEmailValid: async (email) => {
        // Ellenőrizd az email cím formátumát (példa)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    },
    
    // Function for password validation
    isPasswordValid: async (password, passwordConfirmation) => {
        // Ellenőrizd, hogy a jelszók megegyeznek
        return password === passwordConfirmation;
    },
    
    // Function for user registration
    registerUser: async (email, password, passwordConfirmation) => {
        if (!isEmailValid(email)) {
          throw new Error('Az email cím érvénytelen.');
        }
      
        if (!isPasswordValid(password, passwordConfirmation)) {
          throw new Error('A jelszavak nem egyeznek meg.');
        }
      
        // Hívd meg a DAO réteget a felhasználó regisztrálásához
        return userDao.createUser(email, password);
      }

    // Other user-related functions (e.g., registration, profile update) can be defined here
};

module.exports = userBo;