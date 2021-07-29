const pool = require("../db");

class OrdersProductsModel {
  async createOrderProductDb(order_id, product_id, quantity) {
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

module.exports = new OrdersProductsModel();
