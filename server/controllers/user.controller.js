const UsersService = require("../services/users.service");

const createUser = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const response = await UsersService.createUser(
      email,
      password,
      first_name,
      last_name
    );
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UsersService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UsersService.getById(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
