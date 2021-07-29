const pool = require("../db");

class CartsModel {
  async createCartByUserIdDb(id) {
    try {
      const newCartInDb = await pool.query(
        `INSERT INTO carts(user_id)
      VALUES($1) RETURNING *`,
        [id]
      );

      if (newCartInDb.rows?.length) {
        return newCartInDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAllCartsDb() {
    try {
      const allCartsFromDb = await pool.query(`SELECT * FROM carts`);

      if (allCartsFromDb.rows?.length) {
        return allCartsFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async checkCartExistsDb(cart_id) {
    try {
      const cartFromDb = await pool.query(
        `SELECT id FROM carts WHERE id = $1`,
        [cart_id]
      );

      if (cartFromDb.rows?.length) {
        return cartFromDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartByUserIdDb(user_id) {
    try {
      const deleteProductFromDb = await pool.query(
        `DELETE FROM carts WHERE user_id=$1`,
        [user_id]
      );

      return deleteProductFromDb;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsModel();
