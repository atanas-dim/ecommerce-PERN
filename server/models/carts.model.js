const pool = require("../db");

class CartsModel {
  async createCartDb(user_id) {
    try {
      const newCartInDb = await pool.query(
        `INSERT INTO carts(user_id)
      VALUES($1) RETURNING *`,
        [user_id]
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

  async getCartByIdDb(id) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateCartDb(data) {
    const { id, ...newDetails } = data;
    const keyNames = Object.keys(newDetails);
    const properties = Object.values(newDetails);
    let queryParams = [];
    // Params have to start from $2, because id is already taking $1
    for (let i = 0; i <= keyNames.length - 1; i++) {
      queryParams.push(keyNames[i] + "=$" + (i + 2));
    }

    try {
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartDb(id) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsModel();
