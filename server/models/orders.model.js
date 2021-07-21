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

  async getOrderByIdDb(user_id, order_id) {
    const orderByIdFromDb = await pool.query(
      `SELECT orders.id, orders.status, products.name, quantity
       FROM products
       JOIN orders_products 
       ON orders_products.product_id = products.id
       JOIN orders
       ON orders_products.order_id = orders.id
       WHERE orders.user_id = $1 AND orders.id = $2`,
      [user_id, order_id]
    );

    if (orderByIdFromDb.rows?.length) {
      return orderByIdFromDb.rows;
    }

    return null;
  }
}

module.exports = new OrdersModel();
