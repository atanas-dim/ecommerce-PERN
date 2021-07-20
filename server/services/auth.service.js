const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errors");
const refreshTokens = [];

class AuthService {
  loginUser(user) {
    try {
      const token = this.signAccessToken(user);

      const refreshToken = this.signRefreshToken(user);

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
        throw new ErrorHandler(403, "No access.");

      const data = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, userData) => {
          if (err) throw new ErrorHandler(403, "No access.");

          const token = this.signAccessToken(userData);
          //sing new refresh token here and return it for cookie
          return { token: token, user: userData.user };
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  signAccessToken(user) {
    return jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: "30s",
    });
  }

  signRefreshToken(user) {
    return jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET);
  }
}

module.exports = new AuthService();
