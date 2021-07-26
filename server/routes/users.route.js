const express = require("express");
const usersRouter = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyAdminOrOwner } = require("../middleware/verifyAdminOrOwner");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Verify for all requests on this router
usersRouter.use(verifyToken);

// Get all users
usersRouter.get("/", verifyAdmin, getAllUsers);

// Get single user by ID
usersRouter.get("/:id", verifyAdminOrOwner, getUserById);

// Update user
usersRouter.put("/:id", verifyAdminOrOwner, updateUser);

// Delete user
usersRouter.delete("/:id", verifyAdminOrOwner, deleteUser);

module.exports = usersRouter;
