"user strict";

const mysql = require("mysql");
const secretLoader = require("./secret-loader");

const load_host = secretLoader.loadSecret("mysql_host.txt");
const load_user = secretLoader.loadSecret("mysql_user.txt");
const load_password = secretLoader.loadSecret("mysql_password.txt");
const load_database = secretLoader.loadSecret("mysql_database.txt");

// db connection
var connection = mysql.createConnection({
  host: load_host,
  user: load_user,
  password: load_password,
  database: load_database
});

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
