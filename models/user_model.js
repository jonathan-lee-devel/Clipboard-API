const pool = require('../config/db/db.config');

// User object constructor
const UserModel = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

UserModel.validate = (user) => {
  return (user.email && user.username && user.password);
}

module.exports = UserModel;
