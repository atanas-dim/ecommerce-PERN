const express = require("express");
const usersRouter = express.Router();
const pool = require("../db");

const UsersService = require("../services/UsersService");

// Create user
usersRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, first_name, last_name } = req.body;

    const newUser = await pool.query(
      `INSERT INTO users(email, password, first_name, last_name) 
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, password, first_name, last_name]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all users
usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query(`SELECT * FROM users`);
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// // Get single user by ID
// usersRouter.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

//     res.json(user.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// Get single user by ID
usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UsersService.getById(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode).send(error.message);
  }
});

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
