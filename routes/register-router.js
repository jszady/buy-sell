const express = require("express");
const router = express.Router();
const { addUserToDatabase } = require("../db/queries/addUserToDatabase");
const { getUserById } = require("../db/queries/getUserById");
const { isEmptyFeild } = require("../helpers/isEmptyFeild");
/*
  If a user is saved in the cookies that means you are logged in and you cant register
  If there is no user it will show you the loggin page
*/
router.get("/register", (req, res) => {
  const user = req.session.user;
  if (user) {
    return res.redirect("/");
  }
  res.render("register", { user: req.session.user, error: null });
});

/*
  MUST BE ASYNC BECAUSE WHEN LOOKING UP THINGS IN A DATABASE IS A ASYNC OPERATION
  this will get the infromation from the register form
  if any of the fields are empty it will give the appropriate message
  if all info is good
  it will add the user to the database and return the user id
  then we get the user with that id and set the cookie
*/
router.post("/register", async (req, res) => {
  const { name, email, password, city, phone_number } = req.body;

  const errorMessage = await isEmptyFeild({
    name,
    email,
    password,
    city,
    phone_number,
  });

  if (errorMessage) {
    return res.render("register", {
      error: errorMessage,
      user: req.session.user,
    });
  }

  addUserToDatabase(name, email, password, city, phone_number)
    .then((newUserId) => {
      return getUserById(newUserId);
    })
    .then((user) => {
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.log("There is an error in the register rount", err.message);
      res.status(404).send("cnat register user");
    });
});

module.exports = router;
