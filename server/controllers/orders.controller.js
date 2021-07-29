const OrdersService = require("../services/orders.service");

const getAllOrders = async (req, res, next) => {
  try {
    const data = await OrdersService.getAllOrders();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getOrdersByUser = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const data = await OrdersService.getOrdersByUser(user_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const data = await OrdersService.getOrderById(order_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatusById = async (req, res, next) => {
  const { order_id } = req.params;
  const { status } = req.body;
  try {
    const data = await OrdersService.updateOrderStatusById(order_id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatusById,
};
