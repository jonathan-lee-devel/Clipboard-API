/**
 * user_controller.js
 *
 * Controller responsible for defining appropriate actions
 * which will be set to appropriate routes by user router.
 */
const UserModel = require("../models/user_model");

exports.list_all_users = (req, res) => {
  var users_temp = new Array();
  users_temp.push(new UserModel());
  users_temp.push(new UserModel());
  users_temp.push(new UserModel());

  res.json(users_temp);
};
