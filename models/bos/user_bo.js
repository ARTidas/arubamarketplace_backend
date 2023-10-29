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
    const emailExists = await userDao.emailExist(email);

    if (emailExists) {
      throw new Error('Az email cím már használatban van');
    }

    if (password !== passwordConfirmation) {
        throw new Error('A megadott két jelszó nem egyezik.');
    }

    if (toString(password).length < 6) {
      throw new Error('A jelszó legalább 6 karakter hosszú legyen');
    }

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Érvénytelen email cím');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const userData = new userDo(email, password_hash);

    try {
      await userDao.saveUser(userData);
      return 'Regisztráció sikeres';
    } catch (error) {
      console.error(error);
      throw new Error('Hiba történt a regisztráció során');
    }
  },

  comparePassword: async (email, password) => {
    console.log("In the comparation function");
    console.log(email, password);
    const user = await userDao.getUserByEmail(email);
    if (user && bcrypt(password, user.password)) {
      return true;
    }
    return false;
  }
};

module.exports = userBo;