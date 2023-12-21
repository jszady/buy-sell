const { db } = require("./connection");

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

module.exports = { addFavourite, checkFavouriteExist, deleteFavourite };