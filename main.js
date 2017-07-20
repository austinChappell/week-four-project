/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
let submitButton = document.querySelector('#submit');
let searchBar = document.querySelector('#search-bar');
let resultsSection = document.querySelector('.results');
let musicPlayer = document.querySelector('.music-player');
let limiter = document.querySelector('#limit');
let imageArray = document.querySelectorAll('.play-image');

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  let searchTerm = searchBar.value;
  let limit = limiter.value;
  console.log(searchTerm);
  let html = '';
  fetch(`https://itunes.apple.com/search?term=${ searchTerm }&limit=${ limit }`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let resultsArr = data.results;
      console.log(resultsArr);
      resultsArr.forEach(function(result) {
        preview = result.previewUrl;
        let resultItem =
          `<div class="result">
            <div class="result-image-div">
              <div class='one-hundred' style="background-image:url('${ result.artworkUrl100 }')">
                <img class="play-image not-playing" src="assets/images/play-btn-overlay.png" data-preview="${ result.previewUrl }" />
              </div>
            </div>
            <h1 class="artist">${ result.artistName }</h1>
            <h2 class="song">${ result.trackName }</h2>
          </div>`
        html += resultItem;
      });
      resultsSection.innerHTML = html;
      imageArray = document.querySelectorAll('.play-image');
    });
  searchBar.value = '';
});

resultsSection.addEventListener('click', function(e) {
  console.log(e.target.getAttribute('data-preview'));
  if (e.target.hasAttribute('data-preview') && e.target.classList.contains('not-playing')) {
    let mp4 = e.target.getAttribute('data-preview');
    musicPlayer.setAttribute('src', mp4);
    musicPlayer.play();
    imageArray.forEach(function(image) {
      image.classList.remove('playing');
      image.classList.add('not-playing');
      image.src = 'assets/images/play-btn-overlay.png'
    });
    e.target.classList.add('playing');
    e.target.classList.remove('not-playing');
    e.target.src = 'assets/images/pause-btn-overlay.png';
  } else if (e.target.classList.contains('playing')) {
    musicPlayer.pause();
    e.target.classList.remove('playing');
    e.target.classList.add('not-playing');
    e.target.src = 'assets/images/play-btn-overlay.png';
  };
});
