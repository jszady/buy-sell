const { database } = require("./connection");

//Removes the favourite from the favourite table
const removeListingFromFavouritesTable = function (userId, listingId) {

  return database.db
    .query(`DELETE FROM favourites
    WHERE favourites.user_id = $1 AND favourites.listing_id = $2`, [userId, listingId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  removeListingFromFavouritesTable
}
