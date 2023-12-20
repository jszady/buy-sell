const { db } = require("../db/connection");

//Function to check if any inputs are empty and will return a message. If none are empty it will return null
const isFieldEmptyNewListing = async (image, image2, image3, brand, make, year, color, tranmission, price, description) => {

  if (!brand) return "Please enter a brand";
  if (!make) return "Please enter a make";
  if(!year) return "Please enter a year";
  if(!color) return "Please enter a colour";
  if(!tranmission) return "Please enter transmission type";
  if(!price) return "Please enter a price";
  if (!image) return "Please add 3 photos";
  if (!image2) return "Please add 3 photos";
  if (!image3) return "Please add 3 photos";
  if(!description) return "Please enter a description";



  return null;
};


module.exports = {
  isFieldEmptyNewListing
 }
