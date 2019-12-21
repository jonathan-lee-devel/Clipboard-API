var UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");

exports.list_all_users = (req, res) => {
  UserModel.get_all_users((err, user) => {
    if (err) {
      res.send(err);
    } else {
      console.log("res", user);
      res.send(user);
    }
  });
};

exports.register_user = (req, res) => {
  const new_user = new UserModel(req.body);

  // Handles null error
  if (!new_user.username || !new_user.email || !new_user.password) {
    res.status(400).send({
      error: true,
      message: "Must provide username, e-mail address, & password"
    });
  } else {
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(new_user.password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          // Set password to hash result before passing to model
          new_user.password = hash;
          UserModel.register_user(new_user, (err, user) => {
            if (err) {
              res.send(err);
            } else {
              res.json(user);
            }
          });
        }
      });
    });
  }
};

exports.find_user_by_email = (req, res) => {
  const find_user_email = req.params.userEmail;

  // Handles null error
  if (!find_user_email) {
    res.status(400).send({ error: true, message: "Must provide e-mail" });
  } else {
    UserModel.find_user_by_email(find_user_email, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
};

exports.verify_user = (req, res) => {
  const check_user = new UserModel(req.body);

  // Handles null error
  if ((!check_user.username && !check_user.email) || !check_user.password) {
    res.status(400).send({ error: true, message: "Invalid user" });
  } else {
    if (check_user.email) {
      // If an e-mail is provided, use for search
      UserModel.find_user_by_username(check_user.email, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          // On successful return of user
          if (user.length != 1) {
            // On empty or bad result set
            res
              .status(400)
              .send({ error: true, message: "Problem with database search" });
          } else {
            let hash = user[0].password;
            bcrypt.compare(check_user.password, hash).then(function(result) {
              res.send(result);
            });
          }
        }
      });
    } else {
      // Otherwise resort to username for search
      UserModel.find_user_by_username(check_user.username, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          // On successful return of user
          if (user.length != 1) {
            // On empty or bad result set
            res
              .status(400)
              .send({ error: true, message: "Problem with database search" });
          } else {
            let hash = user[0].password;
            bcrypt.compare(check_user.password, hash).then(function(result) {
              res.send(result);
            });
          }
        }
      });
    }
  }
};
