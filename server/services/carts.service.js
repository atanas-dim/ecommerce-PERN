const CartsModel = require("../models/carts.model");
const { ErrorHandler } = require("../helpers/errors");

class CartsService {
  async createCart(user_id) {
    try {
      if (!user_id) {
        throw new ErrorHandler(406, "User ID is required.");
      }

      return await CartsModel.createCartDb(user_id);
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      const allCarts = await CartsModel.getAllCartsDb();
      return allCarts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      //
    } catch (error) {
      throw error;
    }
  }

  async updateCart(data) {
    try {
      //
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      //
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsService();
