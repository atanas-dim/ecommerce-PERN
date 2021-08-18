const express = require("express");
const authRouter = express.Router();
const passport = require("../passport");

const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controllers/auth.controller");

function passportCheck(req, res, next) {
  //this function is to send the passport messages as response if not authorized
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.end(info.message);
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
}

authRouter.post("/register", registerUser);

authRouter.post("/login", passportCheck, loginUser);

authRouter.post("/refresh-token", refreshToken);

module.exports = authRouter;
