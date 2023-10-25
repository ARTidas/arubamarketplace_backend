// user_register_bo.js
const userDao = require('./user_register_dao');

function isEmailValid(email) {
  // Ellenőrizd az email cím formátumát (példa)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function isPasswordValid(password, passwordConfirmation) {
  // Ellenőrizd, hogy a jelszók megegyeznek
  return password === passwordConfirmation;
}

function registerUser(username, email, password, passwordConfirmation) {
  if (!isEmailValid(email)) {
    throw new Error('Az email cím érvénytelen.');
  }

  if (!isPasswordValid(password, passwordConfirmation)) {
    throw new Error('A jelszavak nem egyeznek meg.');
  }

  // Hívd meg a DAO réteget a felhasználó regisztrálásához
  return userDao.createUser(username, email, password);
}

module.exports = {
  isEmailValid,
  isPasswordValid,
  registerUser,
};
