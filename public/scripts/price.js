$(document).ready(function(){
  //On default it will hide the edit price input
  $('.edit-price').hide();

  // If a user hits the edit price button then the input form appears
  $('.price-btn').on('click', function(){
    $(this).closest('.display-listing').find('.edit-price').toggle();
   });

});
