const searchButton = document.getElementById('search_btn');
const songLyricsAPI = 'https://api.lyrics.ovh';


// search button
searchButton.addEventListener('click', e => {
    e.preventDefault();
    const searchValue = document.getElementById('search').value.trim();

    if (!searchValue) {
        alert("There is nothing to search")
    } else {
        searchSong(searchValue)
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
    let display = '';
    data.data.forEach(song =>{
        display += `<p class="author lead"><strong>${song.title}</strong> Album by <span>${song.artist.name}</span> <button style="float: right; margin: 0 0 0 120px; padding: 5px 20px;" class="btn btn-success" data-artist="${song.artist.name}" data-title="${song.title}" >Get Lyrics</button></p>`
    });
    // console.log(display);
    display_data.innerHTML = display;
}