const { ErrorHandler } = require("../helpers/errors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class PaymentsService {
  async makePaymentIntent(email, total) {
    try {
      if (!email || !total)
        throw new ErrorHandler(406, "Email and total price are required.");

      // stripe accepts amount is pence
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "gbp",
        payment_method_types: ["card"],
        receipt_email: email,
      });

      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PaymentsService();
