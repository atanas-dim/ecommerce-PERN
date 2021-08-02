const UsersService = require("../services/users.service");
const { validateEmail } = require("../helpers/validateEmail");
const { validatePassword } = require("../helpers/validatePassword");
const { hashPassword } = require("../helpers/hashPassword");

// Create users is used in authController
const createUser = async (req, res, next) => {
  const { email, hashedPassword, first_name, last_name } = req.body;
  try {
    const data = await UsersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const data = await UsersService.getAllUsers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const data = await UsersService.getUserById(user_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const data = await UsersService.getUserByEmail(email);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { email, password, first_name, last_name } = req.body;
  try {
    let updatedDetails = { first_name, last_name };
    if (email && validateEmail(email)) {
      // If valid add to updatedDetails
      updatedDetails.email = email;
    }

    if (password && validatePassword(password)) {
      // If valid then hash password and add to updatedDetails
      const hashedPassword = await hashPassword(password);
      updatedDetails.password = hashedPassword;
    }

    const data = await UsersService.updateUser({ user_id, ...updatedDetails });

    res.status(200).json({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      roles: data.roles,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const data = await UsersService.deleteUser(user_id);

    res.status(200).json("User and cart deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
