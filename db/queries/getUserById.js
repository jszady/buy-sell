const database = require("../connection");

const getUserById = (userId) => {
  return database.db
    .query(`SELECT * FROM users WHERE id = $1`, [userId])
    .then((user) => {
      if (user.rows.length > 0) {
        return user.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("Error in getUserById function", err.message);
      throw err;
    });
};

module.exports = { getUserById };
