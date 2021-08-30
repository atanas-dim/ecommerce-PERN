const CartsModel = require("../models/carts.model");
const CartsProductsModel = require("../models/cartsProducts.model");
const { ErrorHandler } = require("../helpers/errors");

class CartsService {
  async createCartByUserId(id) {
    try {
      if (!id) throw new ErrorHandler(406, "User ID is required.");

      return await CartsModel.createCartByUserIdDb(id);
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

  async checkCartExists(cart_id) {
    try {
      const findCart = await CartsModel.checkCartExistsDb(cart_id);

      if (!findCart) throw new ErrorHandler(404, "Cart not found");

      return findCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartWithProducts(cart_id) {
    try {
      const findCartWithProducts =
        await CartsProductsModel.getCartWithProductsDb(cart_id);

      if (!findCartWithProducts) return "Cart is empty";

      return findCartWithProducts;
    } catch (error) {
      throw error;
    }
  }

  async addCartProduct(cart_id, product_id, quantity, size) {
    try {
      if (!product_id || !size)
        throw new ErrorHandler(406, "Product ID and size required.");

      if (quantity <= 0)
        throw new ErrorHandler(406, "Quantity has to be a positive value.");

      // const findCartProduct = await CartsProductsModel.getCartProductDb(
      //   cart_id,
      //   product_id,
      //   size
      // );

      // if (findCartProduct) return "Product already exists in this cart.";

      const newCartProduct = await CartsProductsModel.addCartProductDb(
        cart_id,
        product_id,
        quantity,
        size
      );
      return {
        product_id: newCartProduct.product_id,
        quantity: newCartProduct.quantity,
        size: newCartProduct.size,
        cart_id: newCartProduct.cart_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCartProduct(cart_id, product_id, size, quantity) {
    try {
      if (!product_id || !quantity || !size)
        throw new ErrorHandler(406, "Product ID, quantity and size required.");

      const findCartProduct = await CartsProductsModel.getCartProductDb(
        cart_id,
        product_id,
        size
      );

      if (!findCartProduct)
        throw new ErrorHandler(404, "Product is still not added to this cart.");

      const updatedProduct = await CartsProductsModel.updateCartProductDb(
        cart_id,
        product_id,
        size,
        quantity
      );

      return {
        product_id: updatedProduct.product_id,
        quantity: updatedProduct.quantity,
        size: updatedProduct.size,
        cart_id: updatedProduct.cart_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProduct(cart_id, product_id, size) {
    try {
      const deletedProduct = await CartsProductsModel.deleteCartProductDb(
        cart_id,
        product_id,
        size
      );
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsService();
