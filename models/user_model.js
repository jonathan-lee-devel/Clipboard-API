/**
 * user_model.js
 *
 * Defines a User schema/object structure,
 * as well as pre-defined database access queries pretaining
 * strictly to users persisted within a database.
 */

// User object constructor
const UserModel = function(user) {
    if (user === undefined)
        user = {
          email: 'unset',
          username: 'unset',
          password: 'unset'
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

module.exports = UserModel;
