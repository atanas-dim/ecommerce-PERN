const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  const comparedPassword = bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

module.exports = { hashPassword, comparePassword };
