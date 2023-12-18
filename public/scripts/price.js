$(document).ready(function(){
  $('.edit-price').hide();

  $('.price-btn').on('click', function(){
    $(this).closest('.display-listing').find('.edit-price').toggle();
   });
});
