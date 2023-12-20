// PG database client/connection setup
const database = require("./connection");

//Gives sellers the ability to mark their listings as sold
const changeItemToSoldInDatabase = function(listingID) {
  //Updates listings table and sets sold column to sold for given listing ID
  return database.db
    .query(`UPDATE listings
    SET sold = 'SOLD'
    WHERE id = $1`, [listingID])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}


//Allows users to relist their sold listings if the sale falls through
const relistItemInDatabase = function(listingID) {
  //Updates the listings table and sets the sold column to null for corresponding listingID
  return database.db
    .query(`UPDATE listings
    SET sold = null
    WHERE id = $1`, [listingID])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

}


module.exports = {

  changeItemToSoldInDatabase,
  relistItemInDatabase
  };
