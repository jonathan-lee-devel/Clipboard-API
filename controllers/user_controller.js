/**
 * user_controller.js
 * 
 * IMPORTANT NOTE: It is the responsibility of routers in this applications current
 * configuration to restrict access to specific routes/resources using the provided
 * auth.ensure_authenticated function
 *
 * Controller responsible for defining appropriate actions
 * which will be set to appropriate routes by user router.
 */
const UserModel = require("../models/user_model");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.list_all_users = (req, res) => {
  UserModel.get_all_users((err, users) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
};

exports.find_user_by_id = (req, res) => {};

exports.find_user_by_email = (req, res) => {};

exports.compare_user_password = (req, res) => {};

exports.login_user = (req, res, next) => {
  passport.authenticate("local", {
    successMessage: "User authentication successful",
    failureMessage: "User  authentication failure"
  })(req, res, next);
};

exports.logout_user = (req, res) => {
  req.logout();
  res.json({ msg: "User successfully logged out" }); 
}

exports.register_new_user = (req, res) => {
  const attempted_new_user = new UserModel(req.body.attempted_new_user);
  if (!UserModel.validate(attempted_new_user)) {
    res.json({ msg: "Cannot register invalid user" });
  }

  // Hash the password before saving to database
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(attempted_new_user.password, salt, (err, hashed_password) => {
      if (err) {
        res.json(err);
      }

      attempted_new_user.password = hashed_password;

      UserModel.create_new_user(attempted_new_user);

      // TODO send user creation return status
    })
  );
};
