const { db } = require("../db/connection");

const isEmptyFeild = async ({ name, email, password, city, phone_number }) => {
  if (!name) return "Please Enter A Vaild Name";
  if (!email) return "Please Enter A Valid Email";
  if (!password) return "Please Enter A Valid Password";
  if (!city) return "Please Enter A Valid City";
  if (!phone_number) return "Please Enter A Valid Phone Number";

  const isEmail = await emailExists(email);
  if (isEmail) return "Account With Email Exists";

  return null;
};

const emailExists = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const exists = await db.query(query, values);
  return exists.rows.length > 0;
};
module.exports = { isEmptyFeild };
