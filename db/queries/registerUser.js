const db = require("../connection");

const addUserToDataBase = (name, email, password, city, phone_number) => {
  const query =
    "INSERT INTO users(name, email, password, city, hone_number) VALUES ($1, $2, $3, $4, $5)";
  const value = [name, email, password, city, phone_number];

  return db.query(query, password);
};
