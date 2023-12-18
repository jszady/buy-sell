const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { loginMatches } = require("../helpers/loginMatches");

router.get("/login", (req, res) => {
  console.log("this is the user:::: ", req.session.user);
  res.render("login", { user: req.session.user, error: null });
});

/*
  uses async function loginMatches to see if the email and password match the database
  if not set and error
  if they match set the cookie
*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isValid = await loginMatches(email, password);
    if (!isValid.valid) {
      res.render("login", {
        error: isValid.message,
        user: req.session.user,
      });
    }
    req.session.user = isValid.user;
    res.redirect("/");
  } catch (err) {
    console.log("There is and erorr in login post", err.message);
    res.render("login", {
      error: "An error occurred during login.",
      user: req.session.user || null,
    });
  }
});

module.exports = router;
