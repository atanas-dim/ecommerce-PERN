const express = require("express");
const cartsRouter = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyCartOwner } = require("../middleware/verifyCartOwner");
const {
  getAllCarts,
  getCartWithProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
  checkoutCart,
} = require("../controllers/carts.controller");

// Verify for all requests on this router
cartsRouter.use(verifyToken);

// Get all Carts
cartsRouter.get("/", verifyAdmin, getAllCarts);

// Get single Cart by userID
cartsRouter.get("/:cart_id", verifyCartOwner, getCartWithProducts);

// Add Cart Product
cartsRouter.post("/:cart_id", verifyCartOwner, addCartProduct);

// Update Cart Product
cartsRouter.put("/:cart_id", verifyCartOwner, updateCartProduct);

// Delete Cart Product
cartsRouter.delete("/:cart_id", verifyCartOwner, deleteCartProduct);

// Checkout
cartsRouter.post("/:cart_id/checkout", verifyCartOwner, checkoutCart);

module.exports = cartsRouter;
