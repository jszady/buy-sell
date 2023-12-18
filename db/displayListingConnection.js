// PG database client/connection setup
const database = require("./connection");


//Function to generate listing when user puts listing id into url bar
const showListingByID = function (id) {

  //Creates the SQL to search of that listing/user details
  return database.db
    .query(`SELECT listings.*, users.phone_number, users.email as email, users.name as name
    FROM listings
    JOIN users ON listings.users_id = users.id
    WHERE listings.id = $1`, [id])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


const showListingByUserID = function (userID) {
  return database.db
    .query(`SELECT listings.*
    FROM listings
    WHERE listings.users_id = $1
    ORDER BY listings.id`, [userID])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}



module.exports = {

  showListingByID,
  showListingByUserID
  };
