// chat gpt által létrehozott

const express = require('express');
const app = express();

// Middlewares, útvonalak, stb. ide kerülnek
// Példa: app.use(express.json());

// Az alkalmazás figyeljen egy portra
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`A szerver fut a(z) ${port} porton.`);
});

/*const http = require('http');
const PORT = 8080;

let obj = new UserDo();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Hello world!");
}).listen(PORT); */