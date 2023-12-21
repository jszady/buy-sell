document.getElementById('filter-toggle-btn').addEventListener('click', function() {
  const form = document.getElementById('filter-form');

  if (form.style.display === 'none') {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});


document.getElementById('filter-toggle-btn').addEventListener('click', function() {
  const form = document.getElementById('filter-form');
  form.classList.toggle('is-visible');
});
