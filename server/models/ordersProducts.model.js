const pool = require("../db");

class OrdersProductsModel {
  async createOrderProductDb(order_id, product_id, quantity, size) {
    const newOrdersProductsDb = await pool.query(
      `INSERT INTO orders_products (order_id, product_id, quantity, size)
      VALUES( $1, $2, $3, $4) RETURNING *`,
      [order_id, product_id, quantity, size]
    );

    if (newOrdersProductsDb.rows?.length) {
      return newOrdersProductsDb.rows[0];
    }

    return null;
  }

  async getOrderProductsDb(order_id) {
    const ordersProductsFromDb = await pool.query(
      `SELECT 
          MIN(orders.id) AS order_id,
          products.id AS product_id, 
          products.name AS product_name, 
          SUM(orders_products.quantity)::integer AS quantity,
          orders_products.size AS size,
          products.price AS price
      FROM products
      JOIN orders_products 
          ON orders_products.product_id = products.id
      JOIN orders
          ON orders_products.order_id = orders.id
      WHERE orders.id = $1
      GROUP BY products.id, orders_products.size`,
      [order_id]
    );

    if (ordersProductsFromDb.rows?.length) {
      return ordersProductsFromDb.rows;
    }

    return null;
  }

  async getBestSellersDb() {
    try {
      const allProductsFromDb = await pool.query(`
      SELECT 
      products.id, 
      products.name, 
      products.images, 
      products.price,
      SUM(orders_products.quantity)::integer AS quantity
      FROM products
      JOIN orders_products
      ON orders_products.product_id = products.id
      GROUP BY products.id
      ORDER BY quantity DESC
      LIMIT 4;`);

      if (allProductsFromDb.rows?.length) {
        return allProductsFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrdersProductsModel();
