const OrdersService = require("../services/orders.service");

const createOrder = async (req, res, next) => {
  try {
    const { total, status } = req.body;
    let user_id = req.body.user_id;
    // Check if the order is for the same user or another user(because only admin can add for everyone)
    if (
      user_id !== req.authData.user.id &&
      !req.authData.user.roles.includes("admin")
    ) {
      console.log("Can't place orders for another user.");
    }
    //This check if id was not provided or the user is not admin, then takes the id of the logged in user
    if (!user_id || !req.authData.user.roles.includes("admin")) {
      user_id = req.authData.user.id;
    }

    const data = await OrdersService.createOrder(total, status, user_id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
