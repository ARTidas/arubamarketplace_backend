const express = require('express');
const app = express();
const userController = require('./controllers/user_controller');
const userDo = require('./models/dos/user_do');
const productController = require('./controllers/product_controller');
const userRegisterController = require('./controllers/user_register_controller');

const cors = require('cors');

// Engedélyezd a CORS-t a megfelelő eredettel (frontend eredetével)
app.use(cors({
  origin: 'http://localhost:4200', // Itt add meg a frontend URL-jét
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Az alkalmazás fut a ${port} porton.`);
});

app.use('/api', userController); // Az '/api' útvonal alatt érhető el
app.use('/api', productController);
app.use('/api/user', userRegisterController);

console.log(JSON.stringify(userDo.users, null, 2));
console.log(JSON.stringify(userDo.users, null, 2));
