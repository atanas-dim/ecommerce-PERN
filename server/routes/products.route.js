const express = require("express");
const productsRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

// Create product
productsRouter.post("/", createProduct);

// Get all products
productsRouter.get("/", getAllProducts);

// Get single product by ID
productsRouter.get("/:id", getProductById);

// Update product
productsRouter.put("/:id", updateProduct);

// Delete product
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
