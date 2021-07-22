const pool = require("../db");

class ProductsModel {
  async createProductDb(name, price, description) {
    try {
      const newProductInDb = await pool.query(
        `INSERT INTO products(name, price, description)
      VALUES($1, $2, $3) RETURNING *`,
        [name, price, description]
      );

      if (newProductInDb.rows?.length) {
        return newProductInDb.rows[0];
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsDb() {
    try {
      const allProductsFromDb = await pool.query(`SELECT * FROM products`);

      if (allProductsFromDb.rows?.length) {
        return allProductsFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getProductByIdDb(product_id) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateProductDb(product_id) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductDb(product_id) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsModel();
