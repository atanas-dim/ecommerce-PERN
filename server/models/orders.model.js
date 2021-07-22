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

  async updateOrderByIdDb(order_id, total, status) {
    const updatedOrderInDb = await pool.query(
      `UPDATE orders
      SET total=$2, status=$3, modified=NOW()
      WHERE id=$1 RETURNING *`,
      [order_id, total, status]
    );

    if (updatedOrderInDb.rows?.length) {
      return updatedOrderInDb.rows[0];
    }

    return null;
  }

  async createOrdersProductsDb(order_id, product_id, quantity) {
    const newOrdersProductsDb = await pool.query(
      `INSERT INTO orders_products (order_id, product_id, quantity)
      VALUES( $1, $2, $3) RETURNING *`,
      [order_id, product_id, quantity]
    );

    if (newOrdersProductsDb.rows?.length) {
      return newOrdersProductsDb.rows[0];
    }

    return null;
  }

  async getOrdersProductsDb(order_id) {
    const ordersProductsFromDb = await pool.query(
      `SELECT 
          MIN(orders.id) AS order_id, 
          products.id AS product_id, 
          products.name AS product_name, 
          SUM(orders_products.quantity)::integer AS quantity,
          products.price AS price
      FROM products
      JOIN orders_products 
          ON orders_products.product_id = products.id
      JOIN orders
          ON orders_products.order_id = orders.id
      WHERE orders.id = $1
      GROUP BY products.id;`,
      [order_id]
    );

    if (ordersProductsFromDb.rows?.length) {
      return ordersProductsFromDb.rows;
    }

    return null;
  }
}

module.exports = new OrdersModel();
