const express = require("express");
const router = express.Router();

router.get("/featured", (req, res) => {
  res.render("featured", { user: req.session.user });
});

module.exports = router;
