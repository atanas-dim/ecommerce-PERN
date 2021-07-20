const validatePassword = (password) => {
  //check if it's not empty and if it is a string
  if (password.trim() === "" || typeof password !== "string") return false;
  return password.length > 5;
};

module.exports = { validatePassword };
