const express = require("express");
const { db } = require("../db/connection");
const router = express.Router();

const addFavourite = (userId, listingId) => {
  return db
    .query(
      `INSERT INTO favourites (user_id, listing_id)
    VALUES
      ($1, $2);`,
      [userId, listingId]
    )
    .then((result) => {
      const user = result.rows[0];
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

router.post("/favourites", (req, res) => {
  const userID = req.session.user.id;
  const listingId = req.body.id;
  console.log(userID);
  console.log(listingId);
  // getListingId(listingId).then((response) => {
  //   console.log(response);
  // });
  addFavourite(userID, listingId).then((response) => {
    console.log(response);
  });

  res.redirect("/");
  // res.render("favourites", { user: req.session.user });
});

module.exports = router;