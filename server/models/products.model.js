const pool = require("../db");

class ProductsModel {
  async createProductDb(name, price, description, images, categories, sizes) {
    try {
      const newProductInDb = await pool.query(
        `INSERT INTO products(name, price, description, images, categories, sizes)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, price, description, images, categories, sizes]
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
      const productFromDb = await pool.query(
        `SELECT * FROM products WHERE id = $1`,
        [product_id]
      );

      if (productFromDb.rows?.length) {
        return productFromDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateProductDb(data) {
    const { product_id, ...newDetails } = data;
    const keyNames = Object.keys(newDetails);
    const properties = Object.values(newDetails);
    let queryParams = [];
    // Params have to start from $2, because id is already taking $1
    for (let i = 0; i <= keyNames.length - 1; i++) {
      queryParams.push(keyNames[i] + "=$" + (i + 2));
    }

    try {
      const updatedProduct = await pool.query(
        `UPDATE products
        SET ${queryParams.join(",")}, modified=NOW()
        WHERE id=$1 RETURNING *`,
        [product_id, ...properties]
      );

      if (updatedProduct.rows?.length) {
        return updatedProduct.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductDb(product_id) {
    try {
      const deleteProductFromDb = await pool.query(
        `DELETE FROM products WHERE id=$1`,
        [product_id]
      );

      return deleteProductFromDb;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsModel();
