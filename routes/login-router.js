const express = require("express");
const router = express.Router();
const helpers = require("../db/queries/userExists");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  helpers
    .userExists(email, password)
    .then((user) => {
      console.log(email, password);
      if (user) {
        req.session.userId = user.id;
        console.log(req.session.userId);
        res.redirect("/");
      } else {
        res.status(401).send("Invalid email or password");
      }
    })
    .catch((err) => {
      console.error("Error in login route:", err);
    });
});

module.exports = router;
