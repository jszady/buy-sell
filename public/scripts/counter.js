// Function that will count the maount of characters in the tweet text area.
const countTweetCharacters = function() {

  //Sets the variable maxCharacterCount to equal the number displayed on the HTML form underneath the tweet form
  let maxCharacterCount = document.getElementById('max-count');
  //Sets the variable currentCharacterCount to the length of the text in the tweet form
  let currentCharacterCount = document.getElementById('message').value.length;

  //Sets result to equal the max character count subtract the current character count
  let result = 140 - currentCharacterCount;
  //Sets the maxCharacterCount as the HTML number
  maxCharacterCount.innerHTML = result;

  //Checks to see if the count needs to turn red
  if(result < 0){
    maxCharacterCount.style.color = 'red';
  } else{
     maxCharacterCount.style.color = '';
   }
}

$(document).ready(function() {


  //On any input to the submit tweet form it will execute the countTweetCharacter function
  $('.user-message-textarea').on('input', function(){
   countTweetCharacters();
  })

});
