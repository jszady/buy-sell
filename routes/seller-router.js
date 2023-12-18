const express = require("express");
const router = express.Router();
const { showListingByUserID } = require("../db/displayListingConnection");
const {
  changeItemToSoldInDatabase,
  relistItemInDatabase,
} = require("../db/markItemAsSoldConnection");


router.get('/account', (req, res) => {

  const userID = req.session.user.id;
  //Populates data from listings table base on id input in URL
  showListingByUserID(userID)
    .then((listing) => {
      if (!listing) {
        return res.status(404).send("User not logged in");
      }

      //Listing price will now display in local currency style
      const prices = listing.price.toLocaleString();

      const exports = {
        listing: listing,
        price: prices,
        user: req.session.user,
      };
      res.render("seller_listings", exports);
    })
    .catch((err) => {
      console.error(err);
      return "User not logged in";
    });
});

router.post("/sold", (req, res) => {
  const listingId = req.body.id;
  changeItemToSoldInDatabase(listingId)
    .then((message) => {
      console.log(message);
      res.redirect("account");
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
});

router.post("/relist", (req, res) => {
  const listingId = req.body.id;
  relistItemInDatabase(listingId)
    .then((message) => {
      console.log(message);
      res.redirect("account");
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
});

module.exports = router;
