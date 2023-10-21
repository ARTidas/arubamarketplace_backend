var mysql = require('mysql12');

var con = mysql.createConnection({
  host: "mariadb11.viacomkft.hu",
  database_name: "16153_theapp",
  user: "xxx",
  password: "xxx"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});