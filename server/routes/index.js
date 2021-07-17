const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users");

apiRouter.use("/users", usersRouter);
// apiRouter.use('/ideas', ideasRouter);
// apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
