const searchButton = document.getElementById('search_btn');
const songLyricsAPI = 'https://api.lyrics.ovh';


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
const display_data = document.getElementById('display');
function displayShow(data){
    display_data.innerHTML = `${data.data.map(song =>`
    
        <p class="author lead">
        <strong>${song.title}</strong>
        Album by<span>${song.artist.name}</span>
        <button style ="float: right; margin: 0 0 0 120px; padding: 5px 20px;" class = "btn btn-success" data-artist ="${song.artist.name}" data-title = "${song.title}" >Get Lyrics
        </button></p>
        `).join('')}
        `;
}