const CartsService = require("../services/carts.service");

const getAllCarts = async (req, res, next) => {
  try {
    const data = await CartsService.getAllCarts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCartWithProducts = async (req, res, next) => {
  const { cart_id } = req.params;
  try {
    const data = await CartsService.getCartWithProducts(cart_id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const addedProduct = await CartsService.addCartProduct(
      cart_id,
      product_id,
      quantity
    );

    res.status(201).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

const updateCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id, quantity } = req.body;

  try {
    const data = await CartsService.updateCartProduct(
      cart_id,
      product_id,
      quantity
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id } = req.body;

  try {
    const data = await CartsService.deleteCartProduct(cart_id, product_id);

    res.status(200).json("Product was removed from cart!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCarts,
  getCartWithProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
};
