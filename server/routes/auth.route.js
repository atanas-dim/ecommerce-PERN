const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  // Mock user. This has to be authenticated with passport
  const verifiedUser = {
    id: 1,
    email: "myemail@domain.com",
    roles: ["admin"],
  };

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
});

module.exports = authRouter;
