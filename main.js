/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
let submitButton = document.querySelector('#submit');
let searchTerm = '';
let searchBar = document.querySelector('#search-bar');
let resultsSection = document.querySelector('.results');
let musicPlayer = document.querySelector('.music-player');

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  searchTerm = searchBar.value;
  console.log(searchTerm);
  let html = '';
  fetch(`https://itunes.apple.com/search?term=${ searchTerm }&limit=20`)
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
            <img class="result-image" src="${ result.artworkUrl100 }" data-preview="${ result.previewUrl }" />
            <h1 class="artist">${ result.artistName }</h1>
            <h2 class="song">${ result.trackName }</h2>
          </div>`
        html += resultItem;
      });
      resultsSection.innerHTML = html;
    });
  searchBar.value = '';
});

resultsSection.addEventListener('click', function(e) {
  console.log(e.target.getAttribute('data-preview'));
  if (e.target.tagName === 'IMG') {
    let mp4 = e.target.getAttribute('data-preview');
    musicPlayer.setAttribute('src', mp4);
    musicPlayer.play();
  };
});
