const { ErrorHandler } = require("../helpers/errors");

const verifyAdmin = (req, res, next) => {
  const authData = req.authData;

  if (authData?.user?.roles.includes("admin")) {
    // req.authData = authData;
    next();
  } else {
    throw new ErrorHandler(403, "Admin role required");
  }
};

module.exports = { verifyAdmin };
