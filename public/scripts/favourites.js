// Before the page is refreshed, store the scroll position
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY.toString());
});

// After the page is reloaded, retrieve the stored scroll position and set it
document.addEventListener('DOMContentLoaded', () => {
  const storedScrollPosition = localStorage.getItem('scrollPosition');

  if (storedScrollPosition !== null) {
    window.scrollTo(0, parseInt(storedScrollPosition, 10));
  }
});



// $(document).ready(function () {
//   $(".form").on("submit", function (event) {
//     event.preventDefault();



//     var formData = {
//       id: $('.favourite').val(), // replace with your actual input field id
//       favourited: $('.favourited').val(), // replace with other input fields
//     };
//         // Collect form data or perform other actions here
//         console.log('Form data:', formData);

//         const $tweetText = $('#tweet-text');
//         const $favourited = $('.fa-solid');
//         if (formData.favourited){
//           formData.favourited = false;
//         }
//         console.log(formData);
//     $.ajax({
//       url: "/favourites", // Replace with your form submission URL
//       method: "POST",
//       data: formData,
//       success: function (response) {
//         // console.log("Form submitted successfully:", response);
//         // Optionally, update the DOM or perform other actions on success
//       },
//       error: function (error) {
//         console.error("Error submitting form:", error);
//         // Optionally, handle errors or provide user feedback
//       },
//     });
//   });
// });
