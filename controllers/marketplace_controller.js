const http = require('http');
const PORT = 8080;

let obj = new UserDo();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Hello world!");
}).listen(PORT);