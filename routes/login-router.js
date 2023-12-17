const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../db/queries/getUserByEmail");

router.get("/login", (req, res) => {
  console.log("this is the user:::: ", req.session.user);
  res.render("login", { user: req.session.user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  getUserByEmail(email)
    .then((user) => {
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then((isSamePassword) => {
            if (isSamePassword) {
              req.session.user = user;
              res.redirect("/");
            } else {
              res.status(401).send("Sorry your password doesnt match");
            }
          });
      } else {
        res.status(401).send("User doesnt exist");
      }
    })
    .catch((err) => {
      console.log("There is an error in log in route", err.message);
      res.status(401).send("error occured in login ");
    });
});

module.exports = router;
