const pool = require("../db");

class CartsProductsModel {
  async getCartProductDb(cart_id, product_id) {
    try {
      const cartProductFromDb = await pool.query(
        `SELECT * 
        FROM carts_products
        WHERE cart_id = $1 AND product_id=$2`,
        [cart_id, product_id]
      );

      if (cartProductFromDb.rows?.length) {
        return cartProductFromDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getCartWithProductsDb(cart_id) {
    try {
      const cartWithProductsFromDb = await pool.query(
        `SELECT MIN(carts.id) AS cart_id, 
                products.id AS product_id, 
                products.name AS product_name, 
                SUM(carts_products.quantity)::integer AS quantity,
                products.price AS price 
        FROM carts 
        JOIN carts_products 
                ON carts_products.cart_id = carts.id
        JOIN products
                ON carts_products.product_id = products.id
        WHERE cart_id = $1
        GROUP BY products.id`,
        [cart_id]
      );

      if (cartWithProductsFromDb.rows?.length) {
        return cartWithProductsFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async addCartProductDb(cart_id, product_id, quantity) {
    try {
      const newCartProductInDb = await pool.query(
        `INSERT INTO carts_products(cart_id, product_id, quantity)
        VALUES($1, $2, $3) RETURNING *`,
        //Quantity has a contraint to be a positive value in DB (quantity > 0)
        [cart_id, product_id, quantity || 1]
      );

      if (newCartProductInDb.rows?.length) {
        return newCartProductInDb.rows[0];
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateCartProductDb(cart_id, product_id, quantity) {
    try {
      const updatedProduct = await pool.query(
        `UPDATE carts_products
        SET quantity=$3
        WHERE cart_id=$1 AND product_id=$2 RETURNING *`,
        [cart_id, product_id, quantity]
      );

      if (updatedProduct.rows?.length) {
        return updatedProduct.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProductDb(cart_id, product_id) {
    try {
      const deletedProduct = await pool.query(
        `DELETE FROM carts_products
        WHERE cart_id=$1 AND product_id=$2`,
        [cart_id, product_id]
      );

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsProductsModel();
