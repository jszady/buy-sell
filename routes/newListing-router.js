const express = require("express");
const router = express.Router();
const insertListing = require("../db/newListingConnection");

router.get("/newlisting", (req, res) => {
  res.render("newListing", { user: req.session.user });
});

router.post("/newlisting", (req, res) => {
  const userID = req.session.user.id;
    // Still need to get the cookie data for the user_id
    const data = {
      image: req.body.image,
      image2: req.body.image2,
      image3: req.body.image3,
      brand: req.body.brand,
      make: req.body.make,
      year: req.body.year,
      color: req.body.color,
      transmission: req.body.transmission,
      price: req.body.price,
      description: req.body.description
    };

    console.log(data);
    insertListing(data, userID).then((response) => {
      console.log(response);
    });

  res.redirect("/newlisting");
});

module.exports = router;
