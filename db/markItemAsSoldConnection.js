// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const pool = new Pool(dbParams);
pool.connect();

const changeItemToSoldInDatabase = function(listingID) {
  return pool
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
  return pool
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
  pool,
  changeItemToSoldInDatabase,
  relistItemInDatabase
  };
