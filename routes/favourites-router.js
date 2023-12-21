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
      const newFavourite = result.rows[0];
      console.log('check new FAVOURITES', result.rows.length);
      return newFavourite || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const checkFavouriteExist = (userId, listingId) => {
  return db
    .query(
      `SELECT id FROM favourites
    WHERE user_id = $1 AND listing_id = $2;`,
      [userId, listingId]
    )
    .then((result) => {
      console.log('check FAVOURITES', result.rows.length);
      return result.rows.length > 0;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteFavourite = (userId, listingId) => {
  return db
  .query(
    `DELETE FROM favourites
    WHERE user_id = $1 AND listing_id = $2;`,
    [userId, listingId]
  )
  .then((result) => {
    console.log('check deleted FAVOURITES', result.rows.length);
    return result.rows.length = 0;
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

  res.redirect("/");
});

module.exports = router;
