const express = require("express");
const paymentsRouter = express.Router();
const { makePayment } = require("../controllers/payments.controller");
const { verifyToken } = require("../middleware/verifyToken");

//THIS ROUTER IS FOR DIRECT PAYMENT ONLY
//THE APP USES makePaymentIntent from cart checkout controller

// Verify for all requests on this router
paymentsRouter.use(verifyToken);

// Get all payment
paymentsRouter.post("/", makePayment);

module.exports = paymentsRouter;
