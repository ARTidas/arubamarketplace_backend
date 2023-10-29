const userDao = require('../daos/user_dao');
const userDo = require('../dos/user_do');
const bcrypt = require('bcrypt');

const userBo = {
  getAll: async () => {
    try {
      const users = await userDao.getAll();
      return users;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await userDao.getUserByEmail(email);

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      } else {
        console.log("invalid password");
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  registerUser: async (email, password, passwordConfirmation) => {
    const validationMessages = [];
    const emailExists = await userDao.emailExist(email);

    if (emailExists) {
      validationMessages.push('The email address already exists');
      throw new Error('The email address already exists');
    }

    if (password !== passwordConfirmation) {
        validationMessages.push('The given two passwords are not the same');
        throw new Error('The given two passwords are not the same');
    }

    if (toString(password).length < 6) {
      validationMessages.push('The password must have at least 6 characters');
      throw new Error('The password must have at least 6 characters');
    }

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(email)) {
      validationMessages.push('Invalid email address');
      throw new Error('Invalid email address');
    }

    if (validationMessages.length > 0) {
        // Validation failed, return error messages
        return { success: false, messages: validationMessages };
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userData = new userDo(email, password_hash);

    try {
        await userDao.saveUser(userData);
        return { success: true, message: 'Registration was successful' };
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred during the registration process');
    }
  },

  comparePassword: async (email, password) => {
    const user = await userDao.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            return true;
        }
    return false;
  }
};

module.exports = userBo;