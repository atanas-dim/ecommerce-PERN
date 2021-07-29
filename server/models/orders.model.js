const pool = require("../db");

class OrdersModel {
  async createOrderDb(total, status, user_id) {
    const newOrderInDb = await pool.query(
      `INSERT INTO orders(total, status, user_id)
      VALUES($1, $2, $3) RETURNING *`,
      [total, status, user_id]
    );

    if (newOrderInDb.rows?.length) {
      return newOrderInDb.rows[0];
    }

    return null;
  }

  async getAllOrdersDb() {
    const allOrdersFromDb = await pool.query(
      `SELECT * FROM orders ORDER BY id DESC`
    );

    if (allOrdersFromDb.rows?.length) {
      return allOrdersFromDb.rows;
    }

    return null;
  }

  async getOrdersByUserDb(user_id) {
    const allOrdersByUserFromDb = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC`,
      [user_id]
    );

    if (allOrdersByUserFromDb.rows?.length) {
      return allOrdersByUserFromDb.rows;
    }

    return null;
  }

  async getOrderByIdDb(order_id) {
    const orderByIdFromDb = await pool.query(
      `SELECT * FROM orders WHERE id = $1 ORDER BY id DESC`,
      [order_id]
    );

    if (orderByIdFromDb.rows?.length) {
      return orderByIdFromDb.rows[0];
    }

    return null;
  }

  async updateOrderStatusByIdDb(order_id, status) {
    const updatedOrderInDb = await pool.query(
      `UPDATE orders
      SET status=$2, modified=NOW()
      WHERE id=$1 RETURNING *`,
      [order_id, status]
    );

    if (updatedOrderInDb.rows?.length) {
      return updatedOrderInDb.rows[0];
    }

    return null;
  }
}

module.exports = new OrdersModel();
