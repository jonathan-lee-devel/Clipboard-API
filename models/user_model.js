/**
 * user_model.js
 *
 * Defines a User schema/object structure,
 * as well as pre-defined database access queries pretaining
 * strictly to users persisted within a database.
 */
const db = require("../config/db/db");

// User object constructor
const UserModel = function(user) {
  if (user === undefined)
    user = {
      email: "unset",
      username: "unset",
      password: "unset"
    };

  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

UserModel.validate = user => {
  var is_valid = false;

  is_valid =
    user.email === "string" &&
    user.username === "string" &&
    user.password === "string";

  return is_valid;
};

UserModel.get_all_users = result => {
  db.query("SELECT * FROM USERS ORDER BY id ASC", (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(results, null);
    }
  });
};

UserModel.get_user_by_id = result => {};

UserModel.get_user_by_email = result => {};

UserModel.create_new_user = result => {};

module.exports = UserModel;
