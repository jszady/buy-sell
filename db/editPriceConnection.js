const database = require("./connection");

const editPriceOfListing = function(price, listingID) {
  return database.db
    .query(`UPDATE listings
    SET price = $1
    WHERE id = $2`, [price, listingID])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

}

module.exports = {
editPriceOfListing
 }
