const express = require("express");
const router = express.Router();

const { db } = require("../db/connection");

const getListing = (filter) => {
  return db
    .query(
      `SELECT thumbnail_photo_url, brand, color, price, description
      FROM listings
      WHERE price > $1;`,
      [
        filter.price,
      ]
    )
    .then((result) => {
      const user = result.rows;
      // console.log(user);
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllListings = () => {
  return db
  .query(
    `SELECT * FROM listings;`,
    []
  )
  .then((result) => {
    const user = result.rows;
    // console.log(user);
    return user || null;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

router.get("/", (req, res) => {
  // const temp = {
  //   rows: 555
  // }
  // res.render("index", temp);
  //current issue: index.ejs reads the undefined rows and image before the promise can initialize the variables
  getAllListings().then((response) => {
    // console.log(response);
    const data = response;
    const templateVars = {
      rows: data,
      image: data.thumbnail_photo_url
    };
    console.log(templateVars.image);
    res.render("index", templateVars);
  });

});


router.post("/", (req, res) => {

    const input = {
      image: req.body.image,
      brand: req.body.brand,
      color: req.body.color,
      price: req.body.price,
      description: req.body.description
    };
    console.log(input);
    getListing(input).then((response) => {
      console.log(response);
      const data = response;
      const templateVars = {
        rows: data,
        image: data.thumbnail_photo_url
      };
      res.render("index", templateVars);
    });
});

module.exports = router;
