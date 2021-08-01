const pool = require("../db");

class UsersModel {
  async createUserDb(email, hashedPassword, first_name, last_name, roles) {
    try {
      // If no specific role was added then make it a user
      if (!roles) roles = "user";

      const newUserInDb = await pool.query(
        `INSERT INTO users(email, password, first_name, last_name, roles)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [email, hashedPassword, first_name, last_name, roles]
      );

      if (newUserInDb.rows?.length) {
        return newUserInDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsersDb() {
    try {
      const allUsersFromDb = await pool.query(
        `SELECT id, first_name, last_name, email, roles, created, modified FROM users`
      );

      if (allUsersFromDb.rows?.length) {
        return allUsersFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getByIdDb(user_id) {
    try {
      const userFromDb = await pool.query(
        `SELECT id, first_name, last_name, email, roles, created, modified FROM users WHERE id = $1`,
        [user_id]
      );

      if (userFromDb.rows?.length) {
        return userFromDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getByEmailDb(email) {
    try {
      const userFromDb = await pool.query(
        `SELECT users.id, users.email, users.password, users.first_name, users.last_name, users.roles, carts.id AS cart_id FROM users
        JOIN carts ON carts.user_id = users.id
        WHERE email = $1`,
        [email]
      );

      if (userFromDb.rows?.length) {
        return userFromDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateUserDb(data) {
    // Receving data as object
    const { user_id, ...newDetails } = data;
    //Getting the key names of the object as array
    const keyNames = Object.keys(newDetails);
    // Getting all property values from the data object
    const properties = Object.values(newDetails);
    // Adding $ and number for each key name
    let queryParams = [];
    // Params have to start from $2, because id is already taking $1
    for (let i = 0; i <= keyNames.length - 1; i++) {
      queryParams.push(keyNames[i] + "=$" + (i + 2));
    }

    try {
      const updatedUser = await pool.query(
        `UPDATE users
        SET ${queryParams.join(",")}, modified=NOW()
        WHERE id=$1 RETURNING *`,
        [user_id, ...properties]
      );

      if (updatedUser.rows?.length) {
        return updatedUser.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserDb(user_id) {
    try {
      const deleteUserFromDb = await pool.query(
        `DELETE FROM users WHERE id=$1`,
        [user_id]
      );

      return deleteUserFromDb;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersModel();
