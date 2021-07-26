const express = require("express");
const cartsRouter = express.Router();
const {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
} = require("../controllers/carts.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");

// Create Cart
cartsRouter.post("/", createCart);

// Get all Carts
cartsRouter.get("/", getAllCarts);

// Get single Cart by ID
cartsRouter.get("/:id", getCartById);

// Update Cart
cartsRouter.put("/:id", updateCart);

// Delete Cart
cartsRouter.delete("/:id", deleteCart);

module.exports = cartsRouter;
