const bcrypt = require("bcrypt");
const database = require("../connection");
const salt = 10;

const addUserToDatabase = (name, email, password, city, phone_number) => {
  return bcrypt
    .hash(password, salt)
    .then((hash) => {
      const query = `INSERT INTO users (name, email, password, city, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING ID`;
      const values = [name, email, hash, city, phone_number];
      return database.db
        .query(query, values)
        .then((response) => response.rows[0].id);
    })
    .catch((err) => {
      console.log(
        "There is an error in addUserToDatabase function: ",
        err.message
      );
      throw err;
    });
};

module.exports = { addUserToDatabase };
