const ProductsModel = require("../models/products.model");
const { ErrorHandler } = require("../helpers/errors");

class ProductsService {
  async createProduct(name, price, description) {
    try {
      if (!name || !price || !description) {
        throw new ErrorHandler(406, "All fields are required.");
      }

      return await ProductsModel.createProductDb(name, price, description);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const AllProducts = await ProductsModel.getAllProductsDb();
      return AllProducts;
    } catch (error) {
      throw error;
    }
  }

  async getProductById() {
    try {
      //
    } catch (error) {
      throw error;
    }
  }

  async updateProduct() {
    try {
      //
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct() {
    try {
      //
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsService();
