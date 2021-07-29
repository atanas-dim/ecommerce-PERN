const CartsService = require("../services/carts.service");
const OrdersService = require("../services/orders.service");
const PaymentsService = require("../services/payments.service");

const getAllCarts = async (req, res, next) => {
  try {
    const data = await CartsService.getAllCarts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCartWithProducts = async (req, res, next) => {
  const { cart_id } = req.params;
  try {
    //check if cart exists
    await CartsService.checkCartExists(cart_id);

    const data = await CartsService.getCartWithProducts(cart_id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const addedProduct = await CartsService.addCartProduct(
      cart_id,
      product_id,
      quantity
    );

    res.status(201).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

const updateCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id, quantity } = req.body;

  try {
    const data = await CartsService.updateCartProduct(
      cart_id,
      product_id,
      quantity
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteCartProduct = async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id } = req.body;

  try {
    const data = await CartsService.deleteCartProduct(cart_id, product_id);

    res.status(200).json("Product was removed from cart!");
  } catch (error) {
    next(error);
  }
};

const checkoutCart = async (req, res, next) => {
  const { cart_id } = req.params;
  const user_id = req.authData.user.id;
  const { email } = req.authData.user;

  try {
    // get cart items from DB
    const findCartWithProducts = await CartsService.getCartWithProducts(
      cart_id
    );
    // calculate total price
    const total = findCartWithProducts.reduce((total, item) => {
      return (total += Number(item.price) * Number(item.quantity));
    }, 0);
    // create order
    const newOrder = await OrdersService.createOrder(
      total,
      "Payment pending",
      user_id
    );

    //make payment here from payment service
    await PaymentsService.makePaymentIntent(email, total);

    // move products from cart to order and empty cart
    findCartWithProducts.forEach(async (product) => {
      await OrdersService.createOrderProduct(
        newOrder.id,
        product.product_id,
        product.quantity
      );
      await CartsService.deleteCartProduct(cart_id, product.product_id);
    });

    //update order status
    const updatedOrder = await OrdersService.updateOrderStatusById(
      newOrder.id,
      "Payment accepted"
    );

    res.status(200).json({
      order_id: updatedOrder.id,
      status: updatedOrder.status,
      total: updatedOrder.total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCarts,
  getCartWithProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
  checkoutCart,
};
