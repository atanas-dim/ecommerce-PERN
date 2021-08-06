const pool = require("../db");

class AuthModel {
  async addRefreshTokenDb(email, token) {
    try {
      const addRefreshTokenToDb = await pool.query(
        `INSERT INTO refresh_tokens(email, token, expiry)
      VALUES($1, $2, NOW() + interval '1 hour') RETURNING *`,
        [email, token]
      );

      if (addRefreshTokenToDb.rows?.length) {
        return addRefreshTokenToDb.rows[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getRefreshTokenDb(email, token) {
    try {
      const allRefreshTokensFromDb = await pool.query(
        `SELECT * FROM refresh_tokens WHERE email=$1 AND token=$2`,
        [email, token]
      );

      if (allRefreshTokensFromDb.rows?.length) {
        return allRefreshTokensFromDb.rows;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteOldRefreshTokensDb(email) {
    try {
      const deleteRefreshTokensFromDb = await pool.query(
        `DELETE FROM refresh_tokens WHERE email=$1 AND expiry < NOW()`,
        [email]
      );

      return deleteRefreshTokensFromDb;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthModel();
