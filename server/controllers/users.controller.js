const UsersService = require("../services/users.service");
const { validateEmail } = require("../helpers/validateEmail");
const { validatePassword } = require("../helpers/validatePassword");
const { hashPassword } = require("../helpers/hashPassword");

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
  const { email, password, ...newDetails } = req.body;
  try {
    if (email && validateEmail(email)) {
      // If valid add to updatedDetails
      newDetails.email = email;
    }

    if (password && validatePassword(password)) {
      // If valid then hash password and add to updatedDetails
      const hashedPassword = await hashPassword(password);
      newDetails.password = hashedPassword;
    }

    const data = await UsersService.updateUser({
      user_id,
      ...newDetails,
    });

    const { password: storedHash, ...dataWithoutPassword } = data;

    res.status(200).json({
      ...dataWithoutPassword,
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
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
