const express = require("express");
const { db } = require("../db/connection");
const router = express.Router();
const { addFavourite, checkFavouriteExist, deleteFavourite } = require('../db/favouritesConnection');
const {showFavouritesByUserID} = require("../db/displayFavouritesConnection");


router.get("/favourites", (req, res) => {
  const userID = req.session.user.id

  //Pulls all favoruites from favoruites database based on that user ID
  showFavouritesByUserID(userID)
    .then((listing) => {
      if (!listing) {
        return res.status(404).send("User has not created any favourites");
      }

      const exports = {listing: listing, user: req.session.user}
      res.render("favourites", exports);
    })
    .catch((err) => {
      console.error(err);
    });

});


router.post("/favourites", (req, res) => {
  const userID = req.session.user.id;
  const listingId = req.body.id;
  console.log(userID);
  console.log(listingId);

  let doesFavouriteExist = false;

  // stop from adding favourite if it already exists
  checkFavouriteExist(userID, listingId).then((response) => {
    doesFavouriteExist = response;
    console.log(doesFavouriteExist);

    // Deletes favourite if it already exists
    if (doesFavouriteExist) {
      deleteFavourite(userID, listingId).then((response) => {
        return res.redirect("/");
      });
    } else {
      // If the favourite does not exist it will create one
    addFavourite(userID, listingId).then((response) => {
      console.log(response);
      return res.redirect("/");
    });
  }
  });
});


module.exports = router;
