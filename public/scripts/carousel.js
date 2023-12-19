const buttons = document.querySelectorAll(".carousel-button");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    //Sets a varable called offset
    let offset;

    //On button click it checks which class applied to the button click.
    if(button.classList.contains('next')) {
      //When the button is clicked with the next class it sets the offset to 1
      offset = 1;
    } else if (button.classList.contains('prev')) {
       //When the button is clicked with the prev class it sets the offset to -1
      offset = -1;
    } else {
      offset = 0;
    }

    //Declares a variable slides which finds the closest up tree parent with the class caraousel from the button clicked
    //It then finds the slides class within that container
    const slides = button.closest(".carousel").querySelector(".slides");

    //Declares a variable called active slides and sets it to the slide with the data of active
    //(If this is the first loop the data active is on the thumbnail image)
    const activeSlide = slides.querySelector("[data-active]");

    //Creates an array from all the direct children in the slides tag. (This would be each image)
    const slidesArray = Array.from(slides.children);

    //Gets the index of the slide which has the data active in the slides array.
    const activeSlideIndex = slidesArray.indexOf(activeSlide);

    //The new index varaible takes the index of the currently active slide, the offset and the data length and adds them together
    let newIndex = (activeSlideIndex + offset + slidesArray.length) % slidesArray.length;

    //If the index is less then 0
    if(newIndex < 0) {
      //New index equals the length of the slides children - 1
      newIndex = slides.children.length - 1;
    }

    //If the index is greater then slides.children.length it will now equal 0 (brining it back to image 1)
    if(newIndex >= slides.children.length) {
      newIndex = slides.children.length = 0;
    }

    //It now gives the slides child they new data set of active
    slides.children[newIndex].dataset.active = true;

    //Deleres the old dataset
    delete activeSlide.dataset.active;
  })
});

