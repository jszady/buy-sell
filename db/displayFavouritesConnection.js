// PG database client/connection setup
const database = require("./connection");


//Shows all favourite lsiting based on the user ID
const showFavouritesByUserID = function (id) {

  return database.db
    .query(`SELECT listings.*, favourites.id as favId
    FROM favourites
    JOIN listings ON favourites.listing_id = listings.id
    JOIN users ON users.id = favourites.user_id
    WHERE favourites.user_id = $1`, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  showFavouritesByUserID
}
