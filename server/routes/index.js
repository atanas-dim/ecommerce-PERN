const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./auth.route");
const usersRouter = require("./users.route");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
