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

  async addCartProduct(cart_id, product_id, quantity) {
    try {
      if (!product_id) throw new ErrorHandler(406, "Product ID required.");

      if (quantity <= 0)
        throw new ErrorHandler(406, "Quantity has to be a positive value.");

      const findCartProduct = await CartsProductsModel.getCartProductDb(
        cart_id,
        product_id
      );

      if (findCartProduct) return "Product already exists in this cart.";

      const newCartProduct = await CartsProductsModel.addCartProductDb(
        cart_id,
        product_id,
        quantity
      );
      return {
        product_id: newCartProduct.product_id,
        quantity: newCartProduct.quantity,
        cart_id: newCartProduct.cart_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCartProduct(cart_id, product_id, quantity) {
    try {
      if (!product_id || !quantity)
        throw new ErrorHandler(406, "Product ID and quantity required.");

      const findCartProduct = await CartsProductsModel.getCartProductDb(
        cart_id,
        product_id
      );

      if (!findCartProduct)
        throw new ErrorHandler(404, "Product is still not added to this cart.");

      const updatedProduct = await CartsProductsModel.updateCartProductDb(
        cart_id,
        product_id,
        quantity
      );

      return {
        product_id: updatedProduct.product_id,
        quantity: updatedProduct.quantity,
        cart_id: updatedProduct.cart_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProduct(cart_id, product_id) {
    try {
      const deletedProduct = await CartsProductsModel.deleteCartProductDb(
        cart_id,
        product_id
      );
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsService();
