const UsersModel = require("../models/users.model");
const CartsModel = require("../models/carts.model");
const { ErrorHandler } = require("../helpers/errors");

class UsersService {
  async createUser(email, hashedPassword, first_name, last_name) {
    try {
      const findUser = await UsersModel.getByEmailDb(email);

      if (!email || !hashedPassword || !first_name || !last_name)
        throw new ErrorHandler(406, "All fields are required.");

      if (findUser)
        throw new ErrorHandler(409, "User with this email already exists.");

      const newUser = await UsersModel.createUserDb(
        email,
        hashedPassword,
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

  async getUserById(user_id) {
    try {
      const findProduct = await UsersModel.getByIdDb(user_id);

      if (!findProduct) throw new ErrorHandler(404, "User not found");

      return findProduct;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const findUser = await UsersModel.getByEmailDb(email);

      if (!findUser) throw new ErrorHandler(404, "User not found");

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data) {
    const { user_id, email } = data;
    try {
      const findUser = await UsersModel.getByIdDb(user_id);

      if (!findUser)
        throw new ErrorHandler(404, "User with this ID doesn't exist.");

      if (email) {
        const findUserByEmail = await UsersModel.getByEmailDb(email);
        if (findUserByEmail)
          throw new ErrorHandler(400, "Email is already taken.");
      }

      const updatedUser = await UsersModel.updateUserDb(data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(user_id) {
    try {
      const findUser = await UsersModel.getByIdDb(user_id);

      if (!findUser)
        throw new ErrorHandler(404, "User with this ID doesn't exist.");

      //Delete cart first because of foreign keys in carts table in DB
      const deleteCart = await CartsModel.deleteCartByUserIdDb(user_id);
      const deleteUser = await UsersModel.deleteUserDb(user_id);

      return { deleteUser, deleteCart };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersService();
