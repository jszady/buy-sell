const { db } = require("./connection");

// Returns an array of objects that contains all the listing_id's and a new favourite key that determines whether a listing is favourited or not
const getUserFavourites = (userID) => {
  return db
    .query(
      `SELECT listing_id FROM favourites
      WHERE user_id = $1;`,
      [userID]
    )
    .then((result) => {
      const favouritesListingId = result.rows.map(
        (favourite) => favourite.listing_id
      ); //array.map() loops through an array and returns an array of items of the original array depending
      return favouritesListingId || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Gets the specific listings by the user depending on what they typed in
const getListing = (filter) => {
  // Declaring the parameters for the statement, the conditions to be joined together later and the querystring that will hold the finished statement
  const queryParams = [];
  const conditions = [];
  let queryString = 'SELECT id, thumbnail_photo_url, year, brand, color, price, description, sold FROM listings';

  // If any of these exist they get added to the parameters and the condition statemetn at the end

  if (filter.brand) {
    queryParams.push(`%${filter.brand}%`);
    conditions.push(`brand LIKE $${queryParams.length}`);
  }

  if (filter.minPrice) {
    queryParams.push(`${filter.minPrice}`);
    conditions.push(`price >= $${queryParams.length}`);
  }

  if (filter.maxPrice) {
    queryParams.push(`${filter.maxPrice}`);
    conditions.push(`price <= $${queryParams.length}`);
  }
  if (filter.isFeatured) {
    conditions.push(`featured = TRUE`);
  }

  // Makes it so that no matter what option is left out or selected there will always be a 'WHERE' at the start and an 'AND' in between
  if (conditions.length > 0) {
    queryString += " WHERE " + conditions.join(" AND ") + ";";
  }

  return db
    .query(queryString, queryParams)
    .then((result) => {
      const user = result.rows;
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Returns the data in an object for all the listings
const getAllListings = () => {
  return db
    .query(`SELECT * FROM listings;`, [])
    .then((result) => {
      const user = result.rows;
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getListing, getAllListings, getUserFavourites };
