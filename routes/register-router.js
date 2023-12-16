const express = require("express");
const router = express.Router();
const helpers = require("../db/queries/registerUser");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, city, phone_number } = req.body;

  helpers
    .addUserToDataBase(name, email, password, city, phone_number)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("there is an error in the register-route: ", err);
      res.status(400).send("cant register user");
    });
});

module.exports = router;
