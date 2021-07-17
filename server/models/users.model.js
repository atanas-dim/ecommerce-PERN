// import queries from DB here
const pool = require("../db");

class UsersModel {
  async createUserDb(email, password, first_name, last_name) {
    const newUserInDb = await pool.query(
      `INSERT INTO users(email, password, first_name, last_name)
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, password, first_name, last_name]
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
}

module.exports = new UsersModel();
