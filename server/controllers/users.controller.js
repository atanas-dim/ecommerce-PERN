const UsersService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/errors");
const { validateEmail } = require("../helpers/validateEmail");
const { validatePassword } = require("../helpers/validatePassword");
const { hashPassword } = require("../helpers/hashPassword");

// Create users is used in authController
const createUser = async (req, res, next) => {
  const { email, hashedPassword, first_name, last_name, roles } = req.body;
  try {
    const data = await UsersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      roles
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
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
  const { id } = req.params;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(id) === req.authData.user.id
    ) {
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
  const { id } = req.params;
  const { email } = req.body;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(id) === req.authData.user.id
    ) {
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
  const { id } = req.params;
  const { email, password, ...newDetails } = req.body;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(id) === req.authData.user.id
    ) {
      let updatedDetails = { ...newDetails };
      if (email && validateEmail(email)) {
        // If valid add to updatedDetails
        updatedDetails.email = email;
      }

      if (password && validatePassword(password)) {
        // If valid then hash password and add to updatedDetails
        const hashedPassword = await hashPassword(password);
        updatedDetails.password = hashedPassword;
      }

      const data = await UsersService.updateUser({ id, ...updatedDetails });

      res.status(200).json(data);
    } else {
      throw new ErrorHandler(403, "Not authorized.");
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (
      req.authData.user.roles.includes("admin") ||
      Number(id) === req.authData.user.id
    ) {
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
