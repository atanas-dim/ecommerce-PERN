// import queries from DB here
const pool = require("../db");
const { ErrorHnadler, ErrorHandler } = require("../helpers/errors");

class UsersService {
  async createUser() {
    try {
    } catch (error) {
      console.error(error.message);
    }
  }
  async getById(id) {
    try {
      const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

      if (!user.rows[0]) {
        throw new ErrorHandler(404, "User not found");
      }

      return user.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersService();
