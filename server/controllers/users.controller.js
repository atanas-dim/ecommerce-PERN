const UsersService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/errors");
const { hashPassword } = require("../helpers/hashPassword");

// Create users should be moved to authController inside login
const createUser = async (req, res, next) => {
  try {
    const { email, hashedPassword, first_name, last_name, roles } = req.body;
    const data = await UsersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      roles
    );
    res.status(201).json(data);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    if (req.authData.user.roles.includes("admin")) {
      const data = await UsersService.getAllUsers();
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(req.params.id) === req.authData.user.id
    ) {
      const { id } = req.params;
      const data = await UsersService.getUserById(id);
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(req.params.id) === req.authData.user.id
    ) {
      const { email } = req.body;
      const data = await UsersService.getUserByEmail(email);
      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(req.params.id) === req.authData.user.id
    ) {
      const { id } = req.params;
      const newDetails = req.body;

      const data = await UsersService.updateUser({ id, ...newDetails });

      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(req.params.id) === req.authData.user.id
    ) {
      const { id } = req.params;
      const data = await UsersService.deleteUser(id);

      res.status(200).json("User was deleted!");
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
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
