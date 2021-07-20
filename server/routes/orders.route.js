const express = require("express");
const ordersRouter = express.Router();
const { createOrder } = require("../controllers/orders.controller");
const { verifyToken } = require("../middleware/verifyToken");

// Verify for all requests on this router
ordersRouter.use(verifyToken);

// Create order
ordersRouter.post("/", createOrder);

// Get all orders
// ordersRouter.get("/", getAllOrders);

// Get single order by ID
// ordersRouter.get("/:id", getOrderById);

// Update order
// ordersRouter.put("/:id", updateOrder);

module.exports = ordersRouter;
