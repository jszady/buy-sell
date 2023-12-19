const { db } = require("./connection");


// This function inserts a new row into the listings table depending on what the user entered
const insertListing = (listingInfo, userId) => {
  return db
    .query(
      `INSERT INTO listings (thumbnail_photo_url, image_2, image_3, users_id, brand, make, year, color, transmission, price, description)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
      [
        listingInfo.image,
        listingInfo.image2,
        listingInfo.image3,
        userId, // user_id will need to be included in the top from the logged in user data
        listingInfo.brand,
        listingInfo.make,
        listingInfo.year,
        listingInfo.color,
        listingInfo.transmission,
        listingInfo.price,
        listingInfo.description,
      ]
    )
    .then((result) => {
      const user = result.rows[0];
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = insertListing;
