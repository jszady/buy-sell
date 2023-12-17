const database = require("../connection");

const getUserByEmail = (email) => {
  return database.db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((user) => {
      if (user.rows.length > 0) {
        return user.rows[0];
      } else {
        console.log("no user found");
        return null;
      }
    })
    .catch((err) => {
      console.log(
        "There is an error in our getUserByEmail function",
        err.message
      );
      throw err;
    });
};

module.exports = { getUserByEmail };
