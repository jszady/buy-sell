const database = require("./connection");

//Allows admins to changen the price of their listing in the database
const editPriceOfListing = function(price, listingID) {
  //Updates the price for specific lsiting id
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
