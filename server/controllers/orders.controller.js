const OrdersService = require("../services/orders.service");

const createOrder = async (req, res, next) => {
  try {
    const { total, status } = req.body;
    const user_id = req.authData.user.id;

    const data = await OrdersService.createOrder(total, status, user_id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    if (req.authData.user.roles.includes("admin")) {
      const data = await OrdersService.getAllOrders();
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
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

const updateOrderById = async (req, res, next) => {
  const { order_id } = req.params;
  const { total, status } = req.body;
  try {
    const data = await OrdersService.updateOrderById(order_id, total, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createOrdersProducts = async (req, res, next) => {
  const { order_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const data = await OrdersService.createOrdersProducts(
      order_id,
      product_id,
      quantity
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getOrdersProducts = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const data = await OrdersService.getOrdersProducts(order_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderById,
  createOrdersProducts,
  getOrdersProducts,
};
