const express = require('express');
const router = express.Router();
const {showListingByID} = require('../db/displayListingConnection')
const accountSid = 'ACf54e357f446af426d4bc67a3e1f46b4';
const authToken = 'bcda0289ddd42d289d8f7cd913b7bba';
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
      const prices = listing.price.toLocaleString()

      const exports = {listing: listing, price: prices}
      res.render('listing', exports);
    })
    .catch((err) => {
      console.error(err)
      return('Listing not available')
    })




router.post('/sms', (req, res) => {
  const userMessage = `${req.body.text}. My phone number is ${req.body.userNumber}.`;
  const adminPhoneNumber = req.body.number;



  if(!userMessage) {
    return res.status(404).send('Must enter message text.')
  }

  if(!adminPhoneNumber) {
    return res.status(404).send('Unable to contact user by SMS. Please try email.')
  }

  if(userMessage.length > 153) {
    return res.status(404).send('Message must bet 120 characters or under.')
  }
  client.messages
    .create({
      body: userMessage,
      to: adminPhoneNumber, //gets the admin phone number
      from: '+12058595820', // From a valid Twilio number
   })
   .then((message) => {
    console.log(message.sid)
    res.render('delivered')});
   })


});








module.exports = router;
