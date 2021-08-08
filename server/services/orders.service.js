const OrdersModel = require("../models/orders.model");
const OrdersProductsModel = require("../models/ordersProducts.model");
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

  async getOrderProductsById(order_id) {
    try {
      const orderById = await OrdersProductsModel.getOrderProductsDb(order_id);
      if (!orderById) {
        throw new ErrorHandler(404, "Order not found.");
      }
      return orderById;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatusById(order_id, status) {
    try {
      const updateOrderById = await OrdersModel.updateOrderStatusByIdDb(
        order_id,
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

  async createOrderProduct(order_id, product_id, quantity, size) {
    try {
      const newOrderProduct = await OrdersProductsModel.createOrderProductDb(
        order_id,
        product_id,
        quantity,
        size
      );

      if (!newOrderProduct) {
        throw new ErrorHandler(404, "Product not added to order.");
      }

      return newOrderProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrdersService();
