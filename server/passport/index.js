const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UsersModel = require("../models/users.model");
const { comparePassword } = require("../helpers/hashPassword");
const { validatePassword } = require("../helpers/validatePassword");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        // find user in DB
        const data = await UsersModel.getByEmailDb(username);
        const { password: hashedPassword, ...userWithoutPassword } = data;

        if (!data) {
          return done(null, false, { message: "Incorrect email." });
        }
        // use validation helper here
        if (!validatePassword(password)) {
          return done(null, false, { message: "Invalid password." });
        }
        // use helper from hashPassword
        const comparedPassword = await comparePassword(
          password,
          hashedPassword
        );

        if (!comparedPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, userWithoutPassword);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
