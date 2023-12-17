// Function that will count the amount of characters in the  text area.
const countTweetCharacters = function() {

  let maxCharacterCount = document.getElementById('max-count');
  let currentCharacterCount = document.getElementById('message').value.length;

  let result = 120 - currentCharacterCount;
  maxCharacterCount.innerHTML = result;

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
