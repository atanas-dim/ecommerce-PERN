const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errors");
const AuthModel = require("../models/auth.model");

class AuthService {
  async loginUser(user) {
    try {
      const token = await this.signAccessToken(user);
      const refreshToken = await this.signRefreshToken(user);
      // This has to be stored in DB for production
      const addRefreshToken = await AuthModel.addRefreshTokenDb(
        user.email,
        refreshToken
      );

      return { token: token, refreshToken: refreshToken, user: user };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken) {
    try {
      if (refreshToken == null) throw new ErrorHandler(401, "Token missing.");

      const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      // Delete expired refresh tokens
      const deleteOldRefreshTokens = await AuthModel.deleteOldRefreshTokensDb(
        data.user.email
      );

      // get all from DB
      const findRefreshToken = await AuthModel.getRefreshTokenDb(
        data.user.email,
        refreshToken
      );

      if (!findRefreshToken)
        throw new ErrorHandler(403, "No access. Please login.");

      //Important to sign data.user to not break verifyToken middleware
      const newToken = await this.signAccessToken(data.user);

      const newRefreshToken = await this.signRefreshToken(data.user);

      // This has to be stored in DB for production
      const addRefreshToken = await AuthModel.addRefreshTokenDb(
        data.user.email,
        newRefreshToken
      );

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signAccessToken(user) {
    return jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  async signRefreshToken(user) {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  }
}

module.exports = new AuthService();
