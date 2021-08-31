const pool = require("../db");

class CartsProductsModel {
  async getCartProductDb(cart_id, product_id, size) {
    try {
      const cartProductFromDb = await pool.query(
        `SELECT * 
        FROM carts_products
        WHERE cart_id = $1 AND product_id=$2 AND size=$3`,
        [cart_id, product_id, size]
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
                carts_products.size AS size,
                products.price AS price, 
                products.categories AS categories,
                products.images AS images
        FROM carts 
        JOIN carts_products 
                ON carts_products.cart_id = carts.id
        JOIN products
                ON carts_products.product_id = products.id
        WHERE cart_id = $1
        GROUP BY products.id, carts_products.size`,
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

  async addCartProductDb(cart_id, product_id, quantity, size) {
    try {
      const newCartProductInDb = await pool.query(
        `INSERT INTO carts_products(cart_id, product_id, quantity, size)
        VALUES($1, $2, $3, $4) RETURNING *`,
        //Quantity has a contraint to be a positive value in DB (quantity > 0)
        [cart_id, product_id, quantity || 1, size]
      );

      if (newCartProductInDb.rows?.length) {
        return newCartProductInDb.rows[0];
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateCartProductDb(cart_id, product_id, size, quantity) {
    try {
      const updatedProduct = await pool.query(
        `UPDATE carts_products
        SET quantity=$4
        WHERE cart_id=$1 AND product_id=$2 AND size=$3 RETURNING *`,
        [cart_id, product_id, size, quantity]
      );

      if (updatedProduct.rows?.length) {
        return updatedProduct.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProductDb(cart_id, product_id, size) {
    console.log(cart_id, product_id, size);
    try {
      const deletedProduct = await pool.query(
        `DELETE FROM carts_products
        WHERE cart_id=$1 AND product_id=$2 AND size=$3`,
        [cart_id, product_id, size]
      );

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsProductsModel();
