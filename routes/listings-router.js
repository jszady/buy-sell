const express = require("express");
const router = express.Router();
const { showListingByID } = require("../db/displayListingConnection");
//Need to add a '3' to the end accountSid and a 'a' to the end of authToken
//Need t oremove because push to github disables the account as Twilio sees its been published
const accountSid = "ACf54e357f446af426d4bc67a3e1f46b4";
const authToken = "fabdbee4f0e95bc1df71c593e79ac1c";
//Allows to SMS messaging
const client = require("twilio")(accountSid, authToken);

//Gets page with url that uses listing id
router.get("/:id", (req, res) => {
  const listingId = req.params.id;

  //Populates data from listings table base on id input in URL
  showListingByID(listingId)
    .then((listing) => {
      if (!listing) {
        return res.status(404).send("Listing not available");
      }

      //Listing price will now display in local currency style
      const prices = listing.price.toLocaleString();
      //Gives sold its own value
      const sold = listing.sold;
      const exports = {
        listing: listing,
        price: prices,
        user: req.session.user,
        sold: sold
      };
      res.render("listing", exports);
    })
    .catch((err) => {
      console.error(err);
      return "Listing not available";
    });

  router.post("/sms", (req, res) => {
    //Creates the message based on user input. Combines their message and their phone number
    const userMessage = `${req.body.text}. My phone number is ${req.body.userNumber}.`;
    //Gets the phone number of the listing owner
    const adminPhoneNumber = req.body.number;

    //Error handling
    if (!userMessage) {
      return res.status(404).send("Must enter message text.");
    }

    if (!adminPhoneNumber) {
      return res
        .status(404)
        .send("Unable to contact user by SMS. Please try email.");
    }

    if (userMessage.length > 153) {
      return res.status(404).send("Message must bet 120 characters or under.");
    }

    //Sends Twilio Message
    client.messages
      .create({
        body: userMessage,
        to: adminPhoneNumber, //gets the admin phone number
        from: "+12058595820", // From a valid Twilio number
      })
      .then((message) => {
        console.log(message.sid);
        const exports = {


          user: req.session.user

        };
        res.render("delivered", exports);
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send("Unable to contact seller by SMS. Please try");
      })
  });
});

module.exports = router;
