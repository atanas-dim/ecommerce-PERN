// import queries from DB here
const pool = require("../db");

class UsersModel {
  async createUserDb(email, hashedPassword, first_name, last_name, roles) {
    // If no specific role was added then make it a user
    if (!roles) roles = "user";

    const newUserInDb = await pool.query(
      `INSERT INTO users(email, password, first_name, last_name, roles)
      VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [email, hashedPassword, first_name, last_name, roles]
    );

    return newUserInDb.rows[0];
  }

  async getAllUsersDb() {
    const allUsersFromDb = await pool.query(`SELECT * FROM users`);

    if (allUsersFromDb.rows?.length) {
      return allUsersFromDb.rows;
    }

    return null;
  }

  async getByIdDb(id) {
    const userFromDb = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

    if (userFromDb.rows?.length) {
      return userFromDb.rows[0];
    }

    return null;
  }

  async getByEmailDb(email) {
    const userFromDb = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userFromDb.rows?.length) {
      return userFromDb.rows[0];
    }

    return null;
  }

  async updateUserDb(data) {
    // Receving data as object
    const { id, ...newDetails } = data;
    //Getting the key names of the object as array
    const keyNames = Object.keys(newDetails);
    // Getting all property values from the data object
    const properties = Object.values(newDetails);
    // Adding $ and number for each key name
    let queryParams = [];
    // index(let i) has to start at 2 beause id is already taking $1
    for (let i = 0; i <= keyNames.length - 1; i++) {
      queryParams.push(keyNames[i] + "=$" + (i + 2));
    }

    const updatedUser = await pool.query(
      `UPDATE users
      SET ${queryParams.join(",")}, modified=NOW()
      WHERE id=$1 RETURNING *`,
      [id, ...properties]
    );

    if (updatedUser.rows?.length) {
      return updatedUser.rows[0];
    }

    return null;
  }

  async deleteUserDb(id) {
    const deleteUserFromDb = await pool.query(`DELETE FROM users WHERE id=$1`, [
      id,
    ]);

    return deleteUserFromDb;
  }
}

module.exports = new UsersModel();
