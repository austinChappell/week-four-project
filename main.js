// DEFINE VARIABLES
let submitButton = document.querySelector('#submit');
let searchBar = document.querySelector('#search-bar');
let resultsSection = document.querySelector('.results');
let musicPlayer = document.querySelector('.music-player');
let limiter = document.querySelector('#limit');
let imageArray = document.querySelectorAll('.play-image');

// SUBMIT BUTTON IS CLICKED
submitButton.addEventListener('click', function(e) {
  // DON'T LET THE PAGE RELOAD
  e.preventDefault();
  // THIS IS USED TO ADD TO THE QUERY STRING OF THE URL
  let searchTerm = searchBar.value;
  // SET NUMBER OF SEARCH RESULTS
  let limit = limiter.value;
  let html = '';
  fetch(`https://itunes.apple.com/search?term=${ searchTerm }&limit=${ limit }`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let resultsArr = data.results;
      resultsArr.forEach(function(result) {
        // THIS IS THE AUDIO FILE
        preview = result.previewUrl;
        let resultItem =
          `<div class="result">
            <div class="result-image-div">
              <div class='one-hundred' style="background-image:url('${ result.artworkUrl100 }')">
                <img class="play-image not-playing" src="assets/images/play-btn-overlay.png" data-preview="${ result.previewUrl }" />
              </div>
            </div>
            <a href="${ result.artistViewUrl }" target="_blank" ><h1 class="artist">${ result.artistName }</h1></a>
            <a href="${ result.trackViewUrl }" target="_blank" ><h2 class="song">${ result.trackName }</h2></a>
          </div>`
        html += resultItem;
      });
      resultsSection.innerHTML = html;
      imageArray = document.querySelectorAll('.play-image');
    });
  // CLEAR THE SEARCH BAR
  searchBar.value = '';
});

// USES EVENT BUBBLING
resultsSection.addEventListener('click', function(e) {
  // IF ALBUM IMAGE IS CLICKED AND IT'S NOT ALREADY PLAYING
  if (e.target.hasAttribute('data-preview') && e.target.classList.contains('not-playing')) {
    let mp4 = e.target.getAttribute('data-preview');
    // LOAD THE AUDIO FILE
    musicPlayer.setAttribute('src', mp4);
    // PLAY MUSIC
    musicPlayer.play();
    // ALL ALBUMS HAVE THE PLAY ICON
    imageArray.forEach(function(image) {
      image.classList.remove('playing');
      image.classList.add('not-playing');
      image.src = 'assets/images/play-btn-overlay.png'
    });
    // ADD PLAYING CLASS TO, REMOVE NOT-PLAYING CLASS FROM CURRENT SONG
    e.target.classList.add('playing');
    e.target.classList.remove('not-playing');
    e.target.src = 'assets/images/pause-btn-overlay.png';
    // WHEN MUSIC STOPS...
    musicPlayer.addEventListener('ended', function() {
      e.target.classList.remove('playing');
      e.target.classList.add('not-playing');
      e.target.src = 'assets/images/play-btn-overlay.png';
    });
    // IF IT WAS ALREADY PLAYING AND IS CLICKED, PAUSE IT
  } else if (e.target.classList.contains('playing')) {
    musicPlayer.pause();
    e.target.classList.remove('playing');
    e.target.classList.add('not-playing');
    e.target.src = 'assets/images/play-btn-overlay.png';
  };
});
