const express = require("express");
const router = express.Router();
const helpers = require("../db/queries/addUserToDatabase");
const { addUserToDatabase } = require("../db/queries/addUserToDatabase");
const { getUserById } = require("../db/queries/getUserById");

router.get("/register", (req, res) => {
  res.render("register");
});
/*
  see if the cookie exists (eq.session.userId) redirect to homepage
 line 15
 */
router.post("/register", (req, res) => {
  const { name, email, password, city, phone_number } = req.body;

  if (!name || !email || !password || !city || !phone_number) {
    return res.status(400).send("No register feild can be empty");
  }
  addUserToDatabase(name, email, password, city, password)
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
