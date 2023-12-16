const express = require('express');
const router = express.Router();


router.get('/newlisting', (req, res) => {
  res.render('newListing');
});


module.exports = router;
