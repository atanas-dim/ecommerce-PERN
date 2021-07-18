const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users.route");
const authRouter = require("./auth.route");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
