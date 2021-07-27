const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errors");
// This has to be stored in DB for production
const refreshTokens = [];

class AuthService {
  loginUser(user) {
    try {
      const token = this.signAccessToken(user);
      const refreshToken = this.signRefreshToken(user);
      // This has to be stored in DB for production
      refreshTokens.push(refreshToken);

      return { token: token, refreshToken: refreshToken, user: user };
    } catch (error) {
      throw error;
    }
  }

  refreshToken(refreshToken) {
    try {
      if (refreshToken == null) throw new ErrorHandler(401, "Token missing.");

      if (!refreshTokens.includes(refreshToken))
        throw new ErrorHandler(403, "No access. Please login.");

      const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      //Important to sign data.user to not break verifyToken middleware
      const newToken = this.signAccessToken(data.user);
      const newRefreshToken = this.signRefreshToken(data.user);
      // This has to be stored in DB for production
      refreshTokens.push(newRefreshToken);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw error;
    }
  }

  signAccessToken(user) {
    return jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  signRefreshToken(user) {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  }
}

module.exports = new AuthService();
