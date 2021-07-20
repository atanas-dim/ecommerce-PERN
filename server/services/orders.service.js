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
}

module.exports = new OrdersService();
