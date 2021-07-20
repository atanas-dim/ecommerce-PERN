const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const passport = require("../passport");
const { validateEmail } = require("../helpers/validateEmail");
const { validatePassword } = require("../helpers/validatePassword");
const { ErrorHandler } = require("../helpers/errors");
const { hashPassword } = require("../helpers/hashPassword");
const UsersService = require("../services/users.service");

// rework this with controller
authRouter.post("/register", async (req, res, next) => {
  const { email, password, first_name, last_name, roles } = req.body;
  try {
    // Check if email and passwork are valid
    const validEmail = validateEmail(email);
    console.log("email " + validEmail);
    const validPassword = validatePassword(password);
    console.log("password " + validPassword);

    if (!validEmail) {
      throw new ErrorHandler(400, "Email not valid.");
    }

    if (!validPassword) {
      throw new ErrorHandler(400, "Password not valid.");
    }

    // If valid then hash password
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // then create user
    const newUser = await UsersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      roles
    );
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/login", (req, res) => {
  // console.log(req.flash("error"));
  res.send(req.flash("error"));
});

// rework with controller
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    const verifiedUser = req.user;
    try {
      jwt.sign(
        { user: verifiedUser },
        process.env.SESSION_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          res.json({
            token: token,
          });
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = authRouter;
