const express = require("express");
const router = express.Router();
const insertListing = require("../db/newListingConnection");
const {isFieldEmptyNewListing} = require('../helpers/isFieldEmptyNewListing')

router.get("/newlisting", (req, res) => {
  res.render("newListing", { user: req.session.user, error: null });
});

router.post("/newlisting", async (req, res) => {
  const userID = req.session.user.id

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
    //Function to check if any of the feilds are empty
    //If empty it eill give errorMessage the value of null. If not it will be provided message
    const errorMessage = await isFieldEmptyNewListing(
      data.image,
      data.image2,
      data.image3,
      data.brand,
      data.make,
      data.year,
      data.color,
      data.transmission,
      data.price,
      data.description);

    //If error message is not null it will call the drop down error messsage and re-render the page
    if (errorMessage) {
      return res.render("newListing", {
        error: errorMessage,
        user: req.session.user,
      });
    }

  
    insertListing(data, userID).then((response) => {
      console.log(response);
    });

  res.redirect("/newlisting");
});

module.exports = router;
