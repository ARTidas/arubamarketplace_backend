const express = require('express');
const app = express();
const userController = require('./controllers/user_controller');
const userDo = require('./models/dos/user_do');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Az alkalmazás fut a ${port} porton.`);
});

app.use('/api', userController); // Az '/api' útvonal alatt érhető el

console.log(JSON.stringify(userDo.users, null, 2));
console.log(JSON.stringify(userDo.users, null, 2));
