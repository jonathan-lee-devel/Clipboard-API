const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const UserModel = require("../../models/user_model");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        const found_user = UserModel.get_user_by_email(email);
        if (!found_user) {
          return done(null, false, { message: "E-mail not registerd" });
        }

        // Compare given plain-text password to hashed password DB entry for given user
        bcrypt
          .compare(password, found_user.password, (err, success) => {
            if (err) {
              throw error;
            }

            if (success) {
              return done(null, found_user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.get_user_by_id(id, (err, user) => {
      done(err, user);
    });
  });
};
