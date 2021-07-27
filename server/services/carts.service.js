const CartsModel = require("../models/carts.model");
const ProductsModel = require("../models/products.model");
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

  async getCartWithProducts(cart_id) {
    try {
      const findCart = await CartsModel.getCartByIdDb(cart_id);

      if (!findCart) throw new ErrorHandler(404, "Cart not found");

      const findCartWithProducts = await CartsModel.getCartWithProductsDb(
        cart_id
      );

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

      const findProduct = await ProductsModel.getProductByIdDb(product_id);

      if (!findProduct)
        throw new ErrorHandler(404, "Product with this ID doesn't exist.");

      const findCartsProducts = await CartsModel.getCartsProductsDb(
        cart_id,
        product_id
      );

      if (findCartsProducts) return "Product already exists in this cart.";

      const newCartProduct = await CartsModel.addCartProductDb(
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

      const findCart = await CartsModel.getCartByIdDb(cart_id);

      if (!findCart) throw new ErrorHandler(404, "Cart not found.");

      const updatedProduct = await CartsModel.updateCartProductDb(
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
      const findCart = await CartsModel.getCartByIdDb(cart_id);

      if (!findCart) {
        throw new ErrorHandler(404, "Cart not found.");
      }

      if (!product_id) {
        throw new ErrorHandler(406, "Product ID required.");
      }

      const deletedProduct = await CartsModel.deleteCartProductDb(
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
