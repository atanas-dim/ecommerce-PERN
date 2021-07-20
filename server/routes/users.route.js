const express = require("express");
const usersRouter = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Verify for all requests on this router
usersRouter.use(verifyToken);

// Create user is not needed here. It's done in authRouter > register
// usersRouter.post("/", createUser);

// Get all users
usersRouter.get("/", getAllUsers);

// Get single user by ID
usersRouter.get("/:id", getUserById);

// Update user
usersRouter.put("/:id", updateUser);

// Delete user
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
