const express = require("express");
const productsRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");

// Create product
productsRouter.post("/", verifyToken, verifyAdmin, createProduct);

// Get all products
productsRouter.get("/", getAllProducts);

// Get single product by ID
productsRouter.get("/:product_id", getProductById);

// Update product
productsRouter.put("/:product_id", verifyToken, verifyAdmin, updateProduct);

// Delete product
productsRouter.delete("/:product_id", verifyToken, verifyAdmin, deleteProduct);

module.exports = productsRouter;
