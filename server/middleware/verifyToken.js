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
    var decoded = jwt.verify(req.token, process.env.SESSION_SECRET);
    req.authData = decoded;
    next();
  } catch (err) {
    throw new ErrorHandler(403, "Not authorized for this operation.");
  }
};

module.exports = { verifyToken };
