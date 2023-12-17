const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {

  console.log('test')
  req.session = null;
  res.redirect('/login');
});

module.exports = router;
