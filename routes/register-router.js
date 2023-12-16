const express = require("express");
const router = express.Router();
const helpers = require("../db/queries/registerUser");
const { generateRandomString } = require("../helpers/generateRandomString");

router.get("/register", (req, res) => {
  res.render("register");
});
/*
  see if the cookie exists (eq.session.userId) redirect to homepage
 line 15
 */
router.post("/register", (req, res) => {
  const { name, email, password, city, phone_number } = req.body;

  helpers
    .addUserToDataBase(name, email, password, city, phone_number)
    .then(() => {
      const id = generateRandomString();
      req.session.userId = id;
      console.log({ req: req.session });
      res.redirect("/");
    })
    .catch((err) => {
      console.log("there is an error in the register-route: ", err);
      res.status(400).send("cant register user");
    });
});

module.exports = router;
