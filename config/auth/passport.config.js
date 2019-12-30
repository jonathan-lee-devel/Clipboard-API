const localStrategy = require('passport-local');
const bcrypt = require('bcrypt');

/*
 * Temporary base-code, most of which will have to be
   transferred to the user_controller.js
 */

function initialize(passport) {

    const authenticate_user = (email, password, done) => {
        const user = _getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'No user with given e-mail'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect'});
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(
        new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
        }
        ),
        authenticate_user
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, getUserById(id));
    });
};

modules.export = initialize;