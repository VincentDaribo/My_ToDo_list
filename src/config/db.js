require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true
});


db.connect(function(err) {
  if (err) throw err;
  console.log("You are connected!");
});

module.exports = db;