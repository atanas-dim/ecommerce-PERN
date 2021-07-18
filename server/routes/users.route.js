const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

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
