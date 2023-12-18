// PG database client/connection setup
const database = require("./connection");

const changeItemToSoldInDatabase = function(listingID) {
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

const relistItemInDatabase = function(listingID) {
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
