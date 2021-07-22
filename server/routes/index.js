const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
//
const ordersRouter = require("./orders.route");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
//
apiRouter.use("/orders", ordersRouter);

module.exports = apiRouter;
