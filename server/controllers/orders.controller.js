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
      throw new ErrorHandler(403, "Can't place orders for another user.");
    }
    //This checks if id was not provided or the user is not admin, then takes the id of the logged in user
    if (!user_id || !req.authData.user.roles.includes("admin")) {
      user_id = req.authData.user.id;
    }

    const data = await OrdersService.createOrder(total, status, user_id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  const user_id = req.authData.user.id;
  try {
    if (req.authData.user.roles.includes("admin")) {
      const data = await OrdersService.getAllOrders(user_id);
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const getOrdersByUser = async (req, res, next) => {
  const user_id = req.params.user_id;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(user_id) === req.authData.user.id
    ) {
      const data = await OrdersService.getOrdersByUser(user_id);
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const order_id = req.params.order_id;
  const user_id = req.params.user_id;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      user_id === req.authData.user.id
    ) {
      const data = await OrdersService.getOrderById(user_id, order_id);
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
};
