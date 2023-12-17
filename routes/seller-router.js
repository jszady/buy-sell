const express = require("express");
const router = express.Router();
const { showListingByUserID } = require("../db/displayListingConnection");
const {
  changeItemToSoldInDatabase,
  relistItemInDatabase,
} = require("../db/markItemAsSoldConnection");

<<<<<<< HEAD

router.get('/account', (req, res) => {

  const userID = req.session.user.id;
=======
router.get("/account", (req, res) => {
  const userID = 2;
>>>>>>> a439df325c63758d16e60aa0a421067ca35bf0ac
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
