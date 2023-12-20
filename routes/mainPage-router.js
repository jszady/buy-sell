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
  const userID = req.session.user.id;
  let favourites;
  let userListings;
  getUserFavourites(userID).then((response) => {
    favourites = response;
    // Gets all the listings and puts them into the templateVars
    getAllListings().then((listings) => {
      console.log('value', listings);
      userListings = listings;
      if (!favourites){
        userListings = listings.map(listing => { 
          return { ...listing, favourited: false };
        })
        const templateVars = {
          user: req.session.user,
          rows: userListings
        };
        console.log(userListings);
        return res.render("index", templateVars);
      }
      userListings = listings.map(listing => { 
        if (favourites.includes(listing.id)) {
          return { ...listing, favourited: true };
        }
        return { ...listing, favourited: false };
      })
      console.log(userListings);
      const templateVars = {
        user: req.session.user,
        rows: userListings
      };
      res.render("index", templateVars);
    });
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
      rows: data,
    };
    res.render("index", templateVars);
  });
});

module.exports = router;
