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
      document.querySelector('#movie-list ul').innerHTML = data.map(movie => `<li onClick="getMovieDetails(${movie.id})">${movie.title}</li>`)
        .join('');
    })
}


var reviewForm = document.getElementById("review-form")
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  var comment = document.querySelector("#review-input").value;
  document.querySelector('#review-list ul').innerHTML += `<li>${comment}</li>`;
  reviewForm.reset()
})


function suggestMovie() {
  let form = document.querySelector('#suggest-form')
  form.addEventListener('submit', e => {
    e.preventDefault();
    let movieTitle = document.getElementById('movie-name').value
    let poster = document.getElementById('movie-src').value
    let descript = document.getElementById('movie-des').value
    let movieReview = document.getElementById('movie-rev').value

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: movieTitle,
        image: poster,
        description: descript,
        reviews: movieReview
      })
    })
      .then(res => res.json())
      .then(data => data)
      .catch(error => error)
  })
}




document.addEventListener('DOMContentLoaded', () => {
  getMovieDetails(1)
  generateMovieList();
  suggestMovie()
})