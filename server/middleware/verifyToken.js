const { ErrorHandler } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

//Format of the token
// Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.authData = decoded;

    next();
  } catch (err) {
    throw new ErrorHandler(401, err.message);
  }
};

module.exports = { verifyToken };
