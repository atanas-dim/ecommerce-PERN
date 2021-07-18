const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  // Mock user. This has to be authenticated with passport
  const verifiedUser = {
    id: 1,
    email: "myemail@domain.com",
    role: "admin",
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

// // Test route from tutorial
// authRouter.post("/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, process.env.SESSION_SECRET, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created",
//         authData,
//       });
//     }
//   });
// });

module.exports = authRouter;
