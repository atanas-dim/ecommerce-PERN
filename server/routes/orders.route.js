const express = require("express");
const ordersRouter = express.Router();
const {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getOrderProductsById,
  updateOrderStatusById,
} = require("../controllers/orders.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyAdminOrOwner } = require("../middleware/verifyAdminOrOwner");

// Verify for all requests on this router
ordersRouter.use(verifyToken);

// Get all orders
ordersRouter.get("/", verifyAdmin, getAllOrders);

// Get single order by orderId
ordersRouter.get("/:order_id", verifyAdmin, getOrderById);

// Get products for order
ordersRouter.get("/:order_id/products", verifyAdmin, getOrderProductsById);

// Update single order status by orderId (this is for customer service for example)
ordersRouter.put("/status/:order_id", verifyAdmin, updateOrderStatusById);

// Get all orders for userId
ordersRouter.get("/user/:user_id", verifyAdminOrOwner, getOrdersByUser);

module.exports = ordersRouter;
