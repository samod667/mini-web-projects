const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("results");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

/// FUNCTIONS ///

//Search by song or artist
async function searchSong(input) {
  const data = await fetch(`${apiURL}/suggest/${input}`);
  const results = await data.json();
//   console.log(results);

  showData(results);
}

//Show data in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

//Get prev and next results
async function getMoreSongs(url){
    const data = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const results = await data.json();


  showData(results);
}

//Get lyrics
async function getLyrics(artist, songTitle) {
    
     const data = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
     const results = await data.json();

      if (results.error) {
        result.innerHTML = data.error;
      } else {
        const lyrics = results.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

        result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
      }

     more.innerHTML = '';
}

/// EVENTS ///

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  // console.log(searchTerm)

  if (!searchTerm) {
    alert("Please enter a valid choice");
  } else {
    searchSong(searchTerm);
  }
});

//Get lyrics btn click

results.addEventListener('click', e => {
    clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute("data-songtitle");

        getLyrics(artist, songTitle)
    }
})

//head click
document.getElementById('head').addEventListener('click', e => {
    location.reload();
})
