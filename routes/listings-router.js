const express = require('express');
const router = express.Router();
const {showListingByID} = require('../db/displayListingConnection')
const accountSid = 'ACf54e357f446af426d4bc67a3e1f46b43';
const authToken = '3c773ec837e85c2aee8e264e44499611';
//Allows to SMS messaging
const client = require('twilio')(accountSid, authToken);


//Gets page with url that uses listing id
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




router.post('/sms', (req, res) => {
  const userMessage = req.body.text;
  const adminPhoneNumber = req.body.number;
  if(!userMessage) {
    return res.status(404).send('Must enter message text')
  }

  if(!adminPhoneNumber) {
    return res.status(404).send('Unable to contact user by SMS. Please try email')
  }
  client.messages
    .create({
      body: userMessage,
      to: adminPhoneNumber, //gets the admin phone number
      from: '+12058595820', // From a valid Twilio number
   })
   .then((message) => {
    console.log(message.sid)
    res.render('index')});
   })


});








module.exports = router;
