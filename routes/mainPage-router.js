const express = require("express");
const router = express.Router();
const { db } = require("../db/connection");
const { getListing, getAllListings } = require("../db/mainConnection");

const getUserFavourites = (userID) => {
  return db
    .query(
      `SELECT listing_id FROM favourites
      WHERE user_id = $1;`,
      [userID]
    )
    .then((result) => {
      const favouritesListingId = result.rows.map(
        (favourite) => favourite.listing_id
      ); //array.map() loops through an array and returns an array of items of the original array depending
      return favouritesListingId || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// The GET for the home page
router.get("/", (req, res) => {
  const user = req.session.user;
  let favourites;
  let userListings;
  // If the user is logged in it will check for favourites
  if (user) {
    getUserFavourites(user.id).then((response) => {
      favourites = response;
      // Gets all the listings and puts them into the templateVars
      getAllListings().then((listings) => {
        userListings = listings;
        // Sets every featured key in the listings object to false if there are no favourites and renders the template variables
        if (!favourites) {
          userListings = listings.map((listing) => {
            return { ...listing, favourited: false };
          });
          const templateVars = {
            user: req.session.user,
            rows: userListings,
          };
          return res.render("index", templateVars);
        }
        // Compares each listing and if the listing doesn't have a favourite then it is given false so we don't have an issue later
        userListings = listings.map((listing) => {
          if (favourites.includes(listing.id)) {
            return { ...listing, favourited: true };
          }
          return { ...listing, favourited: false };
        });
        // Once the above is done it well render the new data in the template variables
        const templateVars = {
          user: req.session.user,
          rows: userListings,
        };
        res.render("index", templateVars);
      });
    });
  } else {
    // If the person using the side is not logged in it will proceed with the normal way of getting listings
    getAllListings().then((response) => {
      const data = response;
      const templateVars = {
        user: req.session.user,
        rows: data,
        image: data.thumbnail_photo_url,
      };
      res.render("index", templateVars);
    });
  }
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
      rows: data,
    };
    res.render("index", templateVars);
  });
});

module.exports = router;
