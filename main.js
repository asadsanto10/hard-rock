const searchButton = document.getElementById('search_btn');
const songLyricsAPI = 'https://api.lyrics.ovh'; //lyric main API

// search button
searchButton.addEventListener('click', e => {
    e.preventDefault();
    const searchValue = document.getElementById('search').value.trim();
    if (!searchValue) {
        alert("Please search the input");
    } else {
        searchSong(searchValue + "&limit=10");
    }
});

// call lyric API
async function searchSong(song) {
    const response = await fetch(`${songLyricsAPI}/suggest/${song}`);
    const data = await response .json();
    displayShow(data);
}

// dispalay show data
const display_data = document.getElementById('display_data');
function displayShow(data){
    display_data.innerHTML = `${data.data.map(song =>`
        <div class="single-result row align-items-center my-3 p-3"><div class="col-md-9"><h3 class="lyrics-name">${song.title}</h3><p class = "author lead" >Album by<span> ${song.artist.name}</span></p><p style="color: #c0ffcf;">Song Rank: <span>${song.rank}</span></p>
        
        </div><div class = "col-md-3 text-md-right text-center"><button data-artist ="${song.artist.name}" data-title = "${song.title}"  class = "btn btn-success">Get Lyrics</button></div>
        <audio controls>
        <source src="${song.preview}" type="audio/ogg">
        <source src="${song.preview}" type="audio/mpeg">
        </audio>
        </div>
        `).join('')}
        `;
}

// get lyrics button
const getData = document.getElementById('get-data');
display_data.addEventListener('click', e => {
    const clickedElement = e.target;
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-title');
        // console.log(artist);
        // console.log(songTitle);
        getLyrics(artist, songTitle)
    }
})

//get lyrics show
const getLyricText = document.getElementById('get-lyrics');
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${songLyricsAPI}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    //console.log(lyrics);
    getLyricText.innerHTML = `
        <h2 class ="text-success mb-4">${songTitle} - ${artist}</h2><pre class ="lyric text-white">${lyrics}</pre>
    
    `;
}