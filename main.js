const apiUrl = 'http://localhost:3000/movies';

function getMovieDetails(id) {
  fetch(`${apiUrl}/${id}`)
    .then((res) => res.json())
    .then(data => {
      document.getElementById('movie-title').innerHTML = data.title;
      document.querySelector('#poster').src = data.image;
      document.querySelector('#reviews p').innerHTML = data.description;
      document.querySelector('#review-list ul').innerHTML = data.reviews.map(review => `<li>${review}</li>`).join('');
    })
}

function generateMovieList() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#movie-list ul').innerHTML = data.map(movie => `<li onClick="getMovieDetails(${movie.id})">${movie.title}</li>`).join('');
    })
}


document.addEventListener('DOMContentLoaded', () => {
  getMovieDetails(1)
  generateMovieList();

  var reviewForm = document.getElementById("review-form")
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var comment = document.querySelector("#review-input").value;
    document.querySelector('#review-list ul').innerHTML += `<li>${comment}</li>`;
    reviewForm.reset()
  })


  var suggestionForm = document.querySelector('#suggest-form');
  suggestionForm.addEventListener('submit', e => {
    e.preventDefault();
  })
})