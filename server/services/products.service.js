const ProductsModel = require("../models/products.model");
const OrdersProductsModel = require("../models/ordersProducts.model");
const { ErrorHandler } = require("../helpers/errors");

class ProductsService {
  async createProduct(name, price, description, images, categories, sizes) {
    try {
      if (!name || !price || !description || !images || !categories || !sizes)
        throw new ErrorHandler(406, "All fields are required.");

      return await ProductsModel.createProductDb(
        name,
        price,
        description,
        images,
        categories,
        sizes
      );
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

  async getBestSellers() {
    try {
      const bestSellers = await OrdersProductsModel.getBestSellersDb();
      return bestSellers;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsByCategory(category) {
    try {
      const allProducts = await ProductsModel.getAllProductsByCategoryDb(
        category
      );
      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(product_id) {
    try {
      const findProduct = await ProductsModel.getProductByIdDb(product_id);

      if (!findProduct) throw new ErrorHandler(404, "Product not found");

      return findProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(data) {
    const { product_id } = data;
    try {
      const findProduct = await ProductsModel.getProductByIdDb(product_id);

      if (!findProduct)
        throw new ErrorHandler(404, "Products with this ID doesn't exist.");

      const updatedProduct = await ProductsModel.updateProductDb(data);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(product_id) {
    try {
      const findProduct = await ProductsModel.getProductByIdDb(product_id);

      if (!findProduct)
        throw new ErrorHandler(404, "Product with this ID doesn't exist.");

      const deleteProduct = await ProductsModel.deleteProductDb(product_id);

      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsService();
