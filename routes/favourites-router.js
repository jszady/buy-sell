const express = require("express");
const router = express.Router();

router.get("/favourites", (req, res) => {
  res.render("favourites", { user: req.session.user });
});

module.exports = router;
