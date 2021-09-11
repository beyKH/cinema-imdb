var elMoviesList = document.querySelector('.movies__list');

var elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

// MODAL
var elMovieInfoModal = document.querySelector('.movie-info-modal');
var elMovieInfoModalTitle = elMovieInfoModal.querySelector('.movie-info-modal__title');
var elMovieInfoModalRating = elMovieInfoModal.querySelector('.movie-info-modal__rating');
var elMovieInfoModalYear = elMovieInfoModal.querySelector('.movie-info-modal__year');
var elMovieInfoModalDuration = elMovieInfoModal.querySelector('.movie-info-modal__duration');
var elMovieInfoModalIFrame = elMovieInfoModal.querySelector('.movie-info-modal__iframe');
var elMovieInfoModalCategories = elMovieInfoModal.querySelector('.movie-info-modal__categories');
var elMovieInfoModalSummary = elMovieInfoModal.querySelector('.movie-info-modal__summary');
var elMovieInfoModalImdbLink = elMovieInfoModal.querySelector('.movie-info-modal__imdb-link');

// getting minutes from movie object and doing it in hh and mm format
function getHoursStringFromMinutes (minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}

// function movie showing
function showMovies () {

  // movies list cleaning
  elMoviesList.innerHTML = '';
  var elMoviesFragment = document.createDocumentFragment();

  // getting 50 objects from movies list
  for (var movie of movies.slice(0, 50)) {
    var elNewMoviesItem = elMoviesItemTemplate.cloneNode(true);
    elNewMoviesItem.querySelector('.movie__img').src = `https://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`;
    elNewMoviesItem.querySelector('.movie__img').alt = `${movie.Title} poster`;
    elNewMoviesItem.querySelector('.movie__title').textContent = movie.Title;
    elNewMoviesItem.querySelector('.movie__rating').textContent = movie.imdb_rating;
    elNewMoviesItem.querySelector('.movie__year').textContent = movie.movie_year;
    elNewMoviesItem.querySelector('.movie__duration').textContent = getHoursStringFromMinutes(movie.runtime);
    elNewMoviesItem.querySelector('.movie__categories').textContent = movie.Categories.split('|').join(', ');
    elNewMoviesItem.querySelector('.js-more-info-button').dataset.imdbId = movie.imdb_id;

    elMoviesFragment.appendChild(elNewMoviesItem);
  }

  elMoviesList.appendChild(elMoviesFragment);
}

// UPDATE MOVIE MODAL  INFO GETTING IMDB ID AND MTCHING IT WITH CLICKED IMDB ID
function updateMovieInfoModal (imdbId) {
  var movie = movies.find(function (movie) {
    return movie.imdb_id === imdbId;
  });

  elMovieInfoModalTitle.textContent = movie.Title;
  elMovieInfoModalRating.textContent = movie.imdb_rating;
  elMovieInfoModalYear.textContent = movie.movie_year;
  elMovieInfoModalDuration.textContent = getHoursStringFromMinutes(movie.runtime);
  elMovieInfoModalIFrame.src = `https://www.youtube-nocookie.com/embed/${movie.ytid}`;
  elMovieInfoModalCategories.textContent = movie.Categories.split('|').join(', ');
  elMovieInfoModalSummary.textContent = movie.summary;
  elMovieInfoModalImdbLink.href = `https://www.imdb.com/title/${movie.imdb_id}`;
}

// LISTENING THE ALL MOVIES, WAITING CLICK ON BUTTON MORE INFO
elMoviesList.addEventListener('click', function (evt) {

  // IF MATCHES WITH MORE INFO BUTTON THEN THE FUNCTION WILLL GONNA WORK
  if (evt.target.matches('.js-more-info-button')) {

    // IT IS THE FUNTCTION WHICH GET EXACTLY THAT OBJECT AND GIVING UPDATE TO THE MODAL
    updateMovieInfoModal(evt.target.dataset.imdbId);
  }
});

// WHEN CLOSING MODAL, THE IFRAME IS STILL PLAYING, REMOVING FROM IFRAM SRC TO STOP VIDEO
elMovieInfoModal.addEventListener('hidden.bs.modal', function () {
  elMovieInfoModalIFrame.src = '';

});

showMovies();
