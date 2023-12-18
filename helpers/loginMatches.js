const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../db/queries/getUserByEmail");

const loginMatches = async (email, sentPassword) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return { valid: false, message: "Incorrect Email" };
  }
  const password = await bcrypt.compare(sentPassword, user.password);
  if (!password) {
    return { valid: false, message: "Incorrect Password" };
  }
  return { valid: true, user };
};

module.exports = { loginMatches };
