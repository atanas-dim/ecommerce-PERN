const express = require("express");
const ordersRouter = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderById,
  createOrdersProducts,
  getOrdersProducts,
} = require("../controllers/orders.controller");
const { verifyToken } = require("../middleware/verifyToken");

// Verify for all requests on this router
ordersRouter.use(verifyToken);

// Create order
ordersRouter.post("/", createOrder);

// Get all orders
ordersRouter.get("/", getAllOrders);

// Get all orders for userId
ordersRouter.get("/user/:user_id", getOrdersByUser);

// Get single order by orderId
ordersRouter.get("/order/:order_id", getOrderById);

// Update single order by orderId
ordersRouter.put("/order/:order_id", updateOrderById);

// Create order products
ordersRouter.post("/products/:order_id", createOrdersProducts);

// Get order products
ordersRouter.get("/products/:order_id", getOrdersProducts);

// Update orders products
// ordersRouter.put("/products/:order_id/", createOrdersProducts);

module.exports = ordersRouter;
