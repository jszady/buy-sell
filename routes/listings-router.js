const express = require('express');
const router = express.Router();
const {showListingByID} = require('../db/displayListingConnection')



router.get('/:id', (req, res) => {
  const listingId = req.params.id;

  showListingByID(listingId)
    .then((listing) => {
      if (!listing) {
        return res.status(404).send('Listing not available');
      }
      const exports = {listing: listing}
      res.render('listing', exports);

    })
    
    .catch((err) => {
      console.error(err)
      return('Listing not available')
    })


});








module.exports = router;
