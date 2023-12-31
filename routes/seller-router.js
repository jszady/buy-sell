const express = require("express");
const router = express.Router();
const { showListingByUserID } = require("../db/displayListingConnection");
const {
  changeItemToSoldInDatabase,
  relistItemInDatabase,
} = require("../db/markItemAsSoldConnection");
const {editPriceOfListing} = require("../db/editPriceConnection")

router.get("/account", (req, res) => {
  const userID = req.session.user.id;
  //Populates data from listings table base on id input in URL
  showListingByUserID(userID)
    .then((listing) => {
      if (!listing) {
        return res.status(404).send("User has not created any listings");
      }

      //Listing price will now display in local currency style
      const formattedListings = listing.map((listing) => {
        return {
          ...listing,
          price: listing.price.toLocaleString(),
        };
      });

      const exports = {
        listing: formattedListings,
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

router.post("/price", (req, res) => {
  const listingId = req.body.id;
  const price = parseFloat(req.body.price);


  if(isNaN(price)) {
    return res.status(404).send('Please input valid number');
  }

  editPriceOfListing(price, listingId)
    .then((messgae) => {
      console.log(messgae);
      res.redirect("account");
    })
    .catch((err) => {
      console.log(err);
      return err;
    })

})

module.exports = router;
