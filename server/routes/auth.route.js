const express = require("express");
const authRouter = express.Router();
const passport = require("../passport");

const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controllers/auth.controller");

authRouter.post("/register", registerUser);

//this one is for the redirect from passport authentication failure below
// authRouter.get("/failurejson", (req, res) => {
//   console.log(req.sessionStore);
//   res.json({ message: "Incorrect email or password" });
// });

// authRouter.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/api/auth/failurejson", // redirect back to the signup page if there is an error
//     failureFlash: true, // allow flash messages
//   }),
//   loginUser
// );

authRouter.post("/login", passport.authenticate("local"), loginUser);

authRouter.post("/refresh-token", refreshToken);

module.exports = authRouter;
