const express = require("express");
const router = express.Router();
const { getListing, getAllListings } = require("../db/mainConnection");

// The GET for the home page
router.get("/", (req, res) => {
  getAllListings().then((response) => {
    const data = response;
    const templateVars = {
      user: req.session.user,
      rows: data,
      image: data.thumbnail_photo_url,
    };
    console.log(templateVars.image);
    res.render("index", templateVars);
  });
});

// The POST for the filters on the home page
router.post("/", (req, res) => {

  // The input from the filter option on the page
  const input = {
    brand: req.body.brand,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
  };
  // Sends data to the getListing function to be send back to the page
  getListing(input).then((response) => {
    const data = response;
    const templateVars = {
      user: req.session.user,
      rows: data
    };
    res.render("index", templateVars);
  });
});

module.exports = router;
