const { validateEmail } = require("../helpers/validateEmail");
const { validatePassword } = require("../helpers/validatePassword");
const { ErrorHandler } = require("../helpers/errors");
const { hashPassword } = require("../helpers/hashPassword");
const UsersService = require("../services/users.service");
const AuthService = require("../services/auth.service");

const registerUser = async (req, res, next) => {
  const { email, password, first_name, last_name, roles } = req.body;
  try {
    // Check if email and passwork are valid
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) {
      throw new ErrorHandler(400, "Email not valid.");
    }

    if (!validPassword) {
      throw new ErrorHandler(400, "Password not valid.");
    }

    // If valid then hash password
    const hashedPassword = await hashPassword(password);

    // then create user
    const newUser = await UsersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      roles
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const verifiedUser = req.user;

  try {
    const data = AuthService.loginUser(verifiedUser);

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
    });

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const data = AuthService.refreshToken(req.cookies.refreshToken);
    //add new refresh token to cookie

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
