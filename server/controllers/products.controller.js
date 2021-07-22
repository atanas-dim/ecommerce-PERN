const ProductsService = require("../services/products.service");

const createProduct = async (req, res, next) => {
  const { name, price, description } = req.body;
  try {
    const data = await ProductsService.createProduct(name, price, description);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const data = await ProductsService.getAllProducts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
