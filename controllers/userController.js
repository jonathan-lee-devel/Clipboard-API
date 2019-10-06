'use strict';

var User = require('../models/userModel');
const bcrypt = require('bcrypt');

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
    const new_user = new User(req.body);
  
    // Handles null error
    if (!new_user.username || !new_user.email || !new_user.password) {
      res.status(400).send({ error: true, message: 'Must provide username, e-mail address, & password' });
    }
    else {
      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(new_user.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          else {
            // Set password to hash result before passing to model
            new_user.password = hash;
            User.registerUser(new_user, (err, user) => {
              if (err) {
                res.send(err);
              }
              else {
                res.json(user);
              }
            });
          }
        });
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

async function getUserProvidedPartialLogin(user) {
  if (!user.email) {// If e-mail address is not given, search by username
    User.findUserByUsername(user.username, (err, result) => {
      if (err) throw err;
      console.log('@ASYNC: ', result);
    })
    .then( result => {
      return result;
    }).catch( err => console.log(err) );
  } else {// Otherwise search by e-mail address
    User.findUserByEmail(user.email, (err, result) => {
      if (err) throw err;
      console.log('@ASYNC_EMAIL: ', result);
    })
    .then( result => {
      return result;
    }).catch( err => console.log(err) );
  }
}

exports.verify_user = (req, res) => {
  const check_user = new User(req.body);
  let hash = null;

  // Handles null error
  if ( (!check_user.username && !check_user.email) || !check_user.password ) {
    res.status(400).send({ error: true, message: 'Invalid user' });
  }
  else {
    getUserProvidedPartialLogin(check_user)
    .then( (result) => {
      hash = result[0].password;
      console.log('@verify_user: ', hash);
      console.log('@compare: ', check_user.password, hash);
      bcrypt.compare(check_user.password, hash)
      .then(result => {
        console.log(res);
        res.send(result);
      })
      .catch(err => console.error(err.message));

    }).catch( err => console.log(err) );
  }
};
