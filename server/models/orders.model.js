const pool = require("../db");

class OrdersModel {
  async createOrderDb(total, status, user_id) {
    const newOrderInDb = await pool.query(
      `INSERT INTO orders(total, status, user_id)
      VALUES($1, $2, $3) RETURNING *`,
      [total, status, user_id]
    );

    return newOrderInDb.rows[0];
  }
}

module.exports = new OrdersModel();
