window.onload = function () {
  const errorMessage = document.getElementById("error");
  if (errorMessage) {
    setTimeout(function () {
      errorMessage.classList.add("hide-error");
    }, 2000);
  }
};
