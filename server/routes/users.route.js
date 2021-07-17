const express = require("express");
const usersRouter = express.Router();
const pool = require("../db");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");
const UsersService = require("../services/users.service");

// Create user
usersRouter.post("/", createUser);

// Get all users
usersRouter.get("/", getAllUsers);

// Get single user by ID
usersRouter.get("/:id", getUserById);

// Update user
usersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, first_name, last_name } = req.body;
    const updatedUser = await pool.query(
      `UPDATE users 
      SET email=$2, password=$3, first_name=$4, last_name=$5, modified=NOW()
      WHERE id=$1 RETURNING *`,
      [id, email, password, first_name, last_name]
    );

    res.json("User was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete user
usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);

    res.json("User was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = usersRouter;
