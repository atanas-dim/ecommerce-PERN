const express = require("express");
const apiRouter = express.Router();
const { verifyToken } = require("../middleware/verification");

const usersRouter = require("./users.route");
const authRouter = require("./auth.route");

apiRouter.use(verifyToken);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
