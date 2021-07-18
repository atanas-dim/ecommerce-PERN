const UsersModel = require("../models/users.model");
const { ErrorHandler } = require("../helpers/errors");

class UsersService {
  async createUser(email, password, first_name, last_name) {
    try {
      const findUser = await UsersModel.getByEmailDb(email);

      if (!email || !password || !first_name || !last_name) {
        throw new ErrorHandler(406, "All fields are required.");
      }

      if (findUser) {
        throw new ErrorHandler(409, "User with this email already exists.");
      }

      const newUser = await UsersModel.createUserDb(
        email,
        password,
        first_name,
        last_name
      );

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const allUsers = await UsersModel.getAllUsersDb();
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const findUser = await UsersModel.getByIdDb(id);

      if (!findUser) {
        throw new ErrorHandler(404, "User not found");
      }

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, email, password, first_name, last_name) {
    try {
      const findUser = await UsersModel.getByIdDb(id);

      if (!findUser) {
        throw new ErrorHandler(404, "User with this ID doesn't exist.");
      }

      const findUserByEmail = await UsersModel.getByEmailDb(email);
      if (findUserByEmail) {
        throw new ErrorHandler(400, "Email is already taken.");
      }

      const updatedUser = await UsersModel.updateUserDb(
        id,
        email,
        password,
        first_name,
        last_name
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const findUser = await UsersModel.getByIdDb(id);

      if (!findUser) {
        throw new ErrorHandler(404, "User with this ID doesn't exist.");
      }

      const deleteUser = await UsersModel.deleteUserDb(id);

      return deleteUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersService();
