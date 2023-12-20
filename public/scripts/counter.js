// Function that will count the amount of characters in the  text area.
const countCharacters = function() {
  //Sets maxCharacterCount to the class of max-count
  let maxCharacterCount = document.getElementById('max-count');

  //Sets current character count to the length of the message being typed in
  let currentCharacterCount = document.getElementById('message').value.length;

  //Sets result equal to the max character count minus the currentCharacter count
  let result = 120 - currentCharacterCount;

  //The value of max-count will now be that new number
  maxCharacterCount.innerHTML = result;

  //Character count will change colours.
  if(result < 0){
    maxCharacterCount.style.color = 'red';
  } else{
     maxCharacterCount.style.color = '';
   }
}

$(document).ready(function() {

  //On any input to the  form it will execute the countCharacter function
  $('.user-message-textarea').on('input', function(){
   countCharacters();
  })

});
