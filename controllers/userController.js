'use strict';

var User = require('../models/userModel');

exports.list_all_users = (req, res) => {
  User.getAllUsers( (err, user) => {

    if (err) {
      res.send(err);
    }
    else {
      console.log('res', user);
      res.send(user);
    }
  });
};

exports.register_a_user = (req, res) => {
    var new_user = new User(req.body);
  
    // Handles null error
    if (!new_user.username || !new_user.email || !new_user.password) {
      res.status(400).send({ error: true, message: 'Must provide username, e-mail address, & password' });
    }
    else {
      User.registerUser(new_user, (err, user) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(user);
        }
      });
    }
};

exports.find_a_user_by_email = (req, res) => {
  const find_user_email = req.params.userEmail;

  // Handles null error
  if (!find_user_email) {
    res.status(400).send({ error: true, message: 'Must provide e-mail' });
  }
  else {
    User.findUserByEmail(find_user_email, (err, user) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(user);
      }
    });
  }
};

exports.verify_user = (req, res) => {
  var check_user = new User(req.body);

  // Handles null error
  if ( (!check_user.username && !check_user.email) || !check_user.password ) {
    res.status(400).send({ error: true, message: 'Invalid user' });
  }
  else {
    User.verifyUser(check_user, (err, user) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(user);
      }
    });
  }
};
