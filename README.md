This app is designed to search the iTunes music database, using the iTunes API.

The responsive web design is using flex-box.

There is a click event listener on the submit button of the form. This event renders the fetch method to call the iTunes API, parse the data, and then render it to the page using template literal syntax and a forEach loop. The results can vary from 20-100, in multiples of 20. The function inside the event listener also has an event.preventDefault. This prevents the page from reloading, thus allowing the API data to render. As a result of the preventDefault, the input is specifically coded to clear upon clicking the submit button.

The results section of the site has one click event listener on its entire area, and event bubbling is used to find the item that was clicked. If the album artwork is clicked, the song will play. If the artist name is clicked, you will be redirected to the artist's iTunes page in a new tab. If a track name is clicked, you will be redirected to the artist's album page in a new tab.

The play/pause button effect is being done with an image overlay. The album artwork is the background-iamge of its div, and the play button or pause button image is placed inside of this div, with an opacity of 0. On hover, with a half second transition, the image's opacity changes to 0.8. If the image is clicked, it changes between play/pause, and starts and stops the audio player. The play button will also change to pause if the preview sample ends.

The audio player's source is being chosen by the click event listener. Each play button image contains a data-preview attribute containing the track source.
