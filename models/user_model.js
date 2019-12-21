const sql;

// User object constructor
const UserModel = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

UserModel.get_all_users = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      console.log("Users: ", res);
      result(null, res);
    }
  });
};

UserModel.find_user_by_email = (email, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

UserModel.find_user_by_username = (username, result) => {
  sql.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

UserModel.register_user = (user, result) => {
  sql.query("INSERT INTO users set ?", user, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

UserModel.verify_user = (user, result) => {
  sql.query(
    "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?",
    [user.email, user.username, user.password],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

module.exports = UserModel;
