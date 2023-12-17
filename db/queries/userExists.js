const database = require("../connection");
const bcrypt = require("bcrypt");

const userExists = (email, password) => {
  return new Promise((reslove, reject) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    database.db
      .query(query, values)
      .then((response) => {
        const user = response.rows[0];
        console.log(user);
        if (user) {
          bcrypt.compare(password, user.password, (err, isSamePassword) => {
            if (err) {
              console.log("HEREEE");
              reject(err);
            } else if (isSamePassword) {
              reslove(user);
            } else {
              console.log("PASSWORD DOESNT MATCH !!!");
              reslove(null);
            }
          });
        } else {
          console.log("NO USER FOUND !!!");
          reslove(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = { userExists };
