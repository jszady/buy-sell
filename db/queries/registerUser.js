const bcrypt = require("bcrypt");
const database = require("../connection");
const salt = 10;

const addUserToDataBase = (name, email, password, city, phone_number) => {
  return bcrypt
    .hash(password, salt)
    .then((hash) => {
      const query = `INSERT INTO users(name, email, password, city, phone_number) VALUES ($1, $2, $3, $4, $5)`;
      const value = [name, email, hash, city, phone_number];
      return database.db.query(query, value);
    })
    .catch((err) => {
      console.log("There is an error in registerUser: ", err.message);
    });
};

module.exports = { addUserToDataBase };
