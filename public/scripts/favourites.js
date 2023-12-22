// Allows adding favourites to be done without a page reload for a buttery smooth UI experience
$(document).ready(function () {
  $(".form").on("submit", function (event) {
    event.preventDefault();
    const $form = $(this);

    $.ajax({
      url: "/favourites",
      method: "POST",
      data: $form.serialize(),
      success: function (response) {

        // If the ajax request was successfull check whether the star is solid or not and give the opposite effect
        if ($form.find('.fa-regular').length > 0){
          $form
            .find(".fa-regular")
            .removeClass("fa-regular")
            .addClass("fa-solid");
        } else {
          $form
          .find(".fa-solid")
          .removeClass("fa-solid")
          .addClass("fa-regular");
        }
      },
      error: function (error) {
        console.error("Error saving favourite", error);
      },
    });
  });
});
