const CartsService = require("../services/carts.service");

const createCart = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const data = await CartsService.createCart(user_id);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const data = await CartsService.getAllCarts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCartById = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
};
