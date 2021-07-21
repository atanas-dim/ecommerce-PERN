const express = require("express");
const ordersRouter = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
} = require("../controllers/orders.controller");
const { verifyToken } = require("../middleware/verifyToken");

// Verify for all requests on this router
ordersRouter.use(verifyToken);

// Create order
ordersRouter.post("/", createOrder);

// Get all orders
ordersRouter.get("/", getAllOrders);

// Get orders by userId
ordersRouter.get("/user/:user_id", getOrdersByUser);

// Get single order by ID
ordersRouter.get("/:user_id/:order_id", getOrderById);

// Update order
// ordersRouter.put("/:id", updateOrder);

module.exports = ordersRouter;
