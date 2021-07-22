const OrdersModel = require("../models/orders.model");
const { ErrorHandler } = require("../helpers/errors");

class OrdersService {
  async createOrder(total, status, user_id) {
    try {
      if (!total || !status || !user_id) {
        throw new ErrorHandler(406, "All fields are required.");
      }

      const newOrder = await OrdersModel.createOrderDb(total, status, user_id);

      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const allOrders = await OrdersModel.getAllOrdersDb();
      if (!allOrders) {
        throw new ErrorHandler(404, "No orders found.");
      }
      return allOrders;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUser(user_id) {
    try {
      const ordersByUser = await OrdersModel.getOrdersByUserDb(user_id);
      if (!ordersByUser) {
        throw new ErrorHandler(404, "No orders found for this user.");
      }
      return ordersByUser;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(order_id) {
    try {
      const orderById = await OrdersModel.getOrderByIdDb(order_id);
      if (!orderById) {
        throw new ErrorHandler(404, "Order not found.");
      }
      return orderById;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderById(order_id, total, status) {
    try {
      const updateOrderById = await OrdersModel.updateOrderByIdDb(
        order_id,
        total,
        status
      );
      if (!updateOrderById) {
        throw new ErrorHandler(404, "Order not found.");
      }
      return updateOrderById;
    } catch (error) {
      throw error;
    }
  }

  async createOrdersProducts(order_id, product_id, quantity) {
    try {
      const newOrdersProducts = await OrdersModel.createOrdersProductsDb(
        order_id,
        product_id,
        quantity
      );

      if (!newOrdersProducts) {
        throw new ErrorHandler(404, "Product not added to order.");
      }

      return newOrdersProducts;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersProducts(order_id) {
    try {
      const orderProducts = await OrdersModel.getOrdersProductsDb(order_id);

      if (!orderProducts) {
        throw new ErrorHandler(404, "Order doesn't exist or has no products.");
      }

      return orderProducts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrdersService();
