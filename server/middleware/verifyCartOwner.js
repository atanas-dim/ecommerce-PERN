const { ErrorHandler } = require("../helpers/errors");

const verifyCartOwner = (req, res, next) => {
  const { cart_id } = req.params;
  const authData = req.authData;

  if (authData?.user?.cart_id === Number(cart_id)) {
    next();
  } else {
    throw new ErrorHandler(403, "You're not the owner of this cart.");
  }
};

module.exports = { verifyCartOwner };
