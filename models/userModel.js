'use strict';
const sql = require('../util/mysql-connection');

// User object constructor
const User = function (user) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
};

User.getAllUsers = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            console.log("Users: ", res);
            result(null, res);
        }
    });
};

User.findUserByEmail = (email, result) => {
    sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.registerUser = (user, result) =>  {
    sql.query("INSERT INTO users set ?", user, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.verifyUser = (user, result) => {
    sql.query("SELECT * FROM users WHERE (email=? OR username=?) AND password_hash=?", [user.email, user.username, user.password], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = User;