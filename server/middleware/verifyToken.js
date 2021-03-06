const { ErrorHandler } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

//Format of the token
// Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new ErrorHandler(401, "Authorization header missing");

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.authData = verified;

    next();
  } catch (err) {
    throw new ErrorHandler(401, err.message || "Not authorized");
  }
};

module.exports = { verifyToken };
