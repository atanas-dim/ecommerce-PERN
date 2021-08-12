const ProductsService = require("../services/products.service");

const createProduct = async (req, res, next) => {
  const { name, price, description, images, categories, sizes } = req.body;
  try {
    const data = await ProductsService.createProduct(
      name,
      price,
      description,
      images,
      categories,
      sizes
    );

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

const getBestSellers = async (req, res, next) => {
  try {
    const data = await ProductsService.getBestSellers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllProductsByCategory = async (req, res, next) => {
  const category = req.params.category_name;
  try {
    const data = await ProductsService.getAllProductsByCategory(category);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const data = await ProductsService.getProductById(product_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { product_id } = req.params;
  const { ...newDetails } = req.body;
  try {
    const data = await ProductsService.updateProduct({
      product_id,
      ...newDetails,
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const data = await ProductsService.deleteProduct(product_id);

    res.status(200).json("Product was deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getBestSellers,
  getAllProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};
