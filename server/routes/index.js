const express = require("express");
const apiRouter = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const cartsRouter = require("./carts.route");
const ordersRouter = require("./orders.route");
const paymentsRouter = require("./payments.route");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/payments", paymentsRouter);

//Swagger Docs
apiRouter.use("/docs", swaggerUi.serve);
apiRouter.get("/docs", swaggerUi.setup(swaggerDocument));

module.exports = apiRouter;
