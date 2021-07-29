const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PaymentsService = require("../services/payments.service");

const makePayment = async (req, res, next) => {
  const { email, total } = req.body;

  try {
    // make payment intent
    const paymentIntent = await PaymentsService.makePaymentIntent(email, total);

    res.status(200).json("Payment successful!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  makePayment,
};
