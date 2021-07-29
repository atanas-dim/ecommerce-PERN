const { ErrorHandler } = require("../helpers/errors");

const verifyAdminOrOwner = (req, res, next) => {
  const { user_id } = req.params;
  const authData = req.authData;

  if (
    authData?.user?.roles.includes("admin") ||
    authData?.user?.id === Number(user_id)
  ) {
    next();
  } else {
    throw new ErrorHandler(403, "You're not admin or owner of this account.");
  }
};

module.exports = { verifyAdminOrOwner };
