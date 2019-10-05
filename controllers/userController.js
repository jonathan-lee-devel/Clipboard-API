'use strict';

var User = require('../models/userModel');

exports.register_a_user = function (req, res) {
    var new_user = new User(req.body);
  
    // Handles null error
    if (!new_user.username || !new_user.email || !new_user.password_hash) {
      res.status(400).send({ error: true, message: 'Must provide username, e-mail address, & password' });
    }
    else {
      User.registerUser(new_user, function (err, user) {
        if (err) {
          res.send(err);
        }
        else {
          res.json(user);
        }
      });
    }
};