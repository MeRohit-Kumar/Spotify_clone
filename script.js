let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.querySelector('.songItemContainer');

let isShuffle = false;
let isRepeat = false;

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

function populateSongList() {
    songs.forEach((song, index) => {
        let songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">Play <i id="${index}" class="far songItemPlay fa-play-circle"></i></span>
            </span>
        `;
        songItemContainer.appendChild(songItem);
    });
}
populateSongList();

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});

function playSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
}

document.getElementById('shuffleBtn').addEventListener('click', () => {
    isShuffle = !isShuffle;
    alert("Shuffle is " + (isShuffle ? "ON" : "OFF"));
});

document.getElementById('repeatBtn').addEventListener('click', () => {
    isRepeat = !isRepeat;
    alert("Repeat is " + (isRepeat ? "ON" : "OFF"));
});

audioElement.addEventListener('ended', () => {
    if (isRepeat) {
        playSong();
    } else if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
        playSong();
    } else {
        songIndex = (songIndex + 1) % songs.length;
        playSong();
    }
});
