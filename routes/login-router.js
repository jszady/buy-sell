const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  if (res.session.userId) {
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
