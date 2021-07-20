const { ErrorHandler } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

//Format of the token
// Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
  }

  try {
    var decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);

    const userData = {
      id: decoded.user.user.id,
      email: decoded.user.user.email,
      roles: decoded.user.user.roles,
    };
    req.user = userData;

    next();
  } catch (err) {
    throw new ErrorHandler(403, "Not authorized for this operation.");
  }
};

module.exports = { verifyToken };
