const express = require("express");
const usersRouter = express.Router();
const { verifyToken } = require("../middleware/verification");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Verify for all requests on this router
usersRouter.use(verifyToken);

// Create user
usersRouter.post("/", createUser);

// Get all users
usersRouter.get("/", getAllUsers);

// Get single user by ID
usersRouter.get("/:id", getUserById);

// Update user
usersRouter.put("/:id", updateUser);

// Delete user
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
