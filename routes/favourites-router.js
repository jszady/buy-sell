const express = require("express");
const router = express.Router();
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


module.exports = router;
