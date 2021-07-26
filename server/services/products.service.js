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
      const allProducts = await ProductsModel.getAllProductsDb();
      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const findProduct = await ProductsModel.getProductByIdDb(id);

      if (!findProduct) {
        throw new ErrorHandler(404, "Product not found");
      }

      return findProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(data) {
    const { id } = data;
    try {
      const findProduct = await ProductsModel.getProductByIdDb(id);

      if (!findProduct) {
        throw new ErrorHandler(404, "Products with this ID doesn't exist.");
      }

      const updatedProduct = await ProductsModel.updateProductDb(data);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const findProduct = await ProductsModel.getProductByIdDb(id);

      if (!findProduct) {
        throw new ErrorHandler(404, "Product with this ID doesn't exist.");
      }

      const deleteProduct = await ProductsModel.deleteProductDb(id);

      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsService();
