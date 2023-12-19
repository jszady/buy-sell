const express = require("express");
const router = express.Router();
const insertListing = require("../db/newListingConnection");

router.get("/newlisting", (req, res) => {
  res.render("newListing", { user: req.session.user });
});

router.post("/newlisting", (req, res) => {

    // Still need to get the cookie data for the user_id
    const data = {
      image: req.body.image,
      brand: req.body.brand,
      make: req.body.make,
      year: req.body.year,
      color: req.body.color,
      transmission: req.body.transmission,
      price: req.body.price,
      description: req.body.description
    };
    console.log(data);
    insertListing(data).then((response) => {
      console.log(response);
    });
     
  res.redirect("/newlisting");
});

module.exports = router;
