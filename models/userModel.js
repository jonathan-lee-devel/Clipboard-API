'use strict';
const sql = require('../util/mysql-connection');

// User object constructor
const User = function(user){
    this.email = user.email;
    this.username = user.username;
    this.password_hash = user.password_hash;
};

User.registerUser = function (user, result)  {
    sql.query("INSERT INTO users set ?", user, function (err, res) {
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