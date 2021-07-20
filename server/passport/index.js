const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UsersService = require("../services/users.service");
const { comparePassword } = require("../helpers/hashPassword");
const { ErrorHandler } = require("../helpers/errors");

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
        // get this from DB
        const data = await UsersService.getUserByEmail(username);

        if (!data) {
          return done(null, false, { message: "Incorrect email." });
        }
        // use validation helper here
        if (password.length < 5) {
          return done(null, false, { message: "Invalid password." });
        }
        const comparedPassword = await comparePassword(password, data.password);

        if (!comparedPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, data);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
