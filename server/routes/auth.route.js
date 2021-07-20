const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const passport = require("../passport");

const { registerUser, loginUser } = require("../controllers/auth.controller");

authRouter.post("/register", registerUser);

//this one is for the redirect from passport authentication failure below
authRouter.get("/login", (req, res) => {
  // console.log(req.flash("error"));
  res.send(req.flash("error"));
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureFlash: true,
  }),
  loginUser
);

module.exports = authRouter;
