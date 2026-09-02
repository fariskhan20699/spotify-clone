console.log("JS CONNECTED");

// initialization
let songIndex = 0;

let audioElement = new Audio('./songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('master-song-name');

let songItems = Array.from(document.getElementsByClassName('song-item'));

let songs = [
    {songName:"Dil Ibadat", filePath:"./songs/1.mp3", coverPath:"./covers/1.jpg"},
    {songName:"Achi Lagti hu", filePath:"./songs/2.mp3", coverPath:"./covers/2.jpg"},
    {songName:"Love Nawantiti", filePath:"./songs/3.mp3", coverPath:"./covers/3.jpg"},
    {songName:"Tume Dillagi bhool", filePath:"./songs/4.mp3", coverPath:"./covers/4.jpg"},
    {songName:"Koyi Aye na Rabba", filePath:"./songs/5.mp3", coverPath:"./covers/5.jpg"},
    {songName:"Wavy (Slowed+ Reverb)", filePath:"./songs/6.mp3", coverPath:"./covers/6.jpg"},
    {songName:"Fell For You", filePath:"./songs/7.mp3", coverPath:"./covers/7.jpg"},
    {songName:"Pal Pal", filePath:"./songs/8.mp3", coverPath:"./covers/8.jpg"}
];


// song list mein name aur image lagana
songItems.forEach((element, i) => {

    if (songs[i]) {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;

        element.getElementsByClassName("song-name")[0].innerText =
            songs[i].songName;
    }

});


// saare song icons ko Play bana do
const MakeAllPlays = () => {

    Array.from(
        document.getElementsByClassName('song-item-play')
    ).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    });

};


// current playing song ka icon
let currentSongPlay = null;


// handle master play/pause
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        gif.style.opacity = 1;

        // upper song icon bhi pause
        if (currentSongPlay) {
            currentSongPlay.classList.remove('fa-play-circle');
            currentSongPlay.classList.add('fa-pause-circle');
        }

    }

    else {

        audioElement.pause();

        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

        gif.style.opacity = 0;

        // upper song icon bhi play
        if (currentSongPlay) {
            currentSongPlay.classList.remove('fa-pause-circle');
            currentSongPlay.classList.add('fa-play-circle');
        }

    }

});


// listen to audio event
audioElement.addEventListener('timeupdate', () => {

    console.log('timeupdate');

    // update seek bar
    let progress = parseInt(
        (audioElement.currentTime / audioElement.duration) * 100
    );

    // YAHAN myProgress ki jagah myProgressBar
    myProgressBar.value = progress;

});


// seek bar
myProgressBar.addEventListener('change', () => {

    audioElement.currentTime =
        myProgressBar.value * audioElement.duration / 100;

});


// individual song buttons
Array.from(
    document.getElementsByClassName('song-item-play')
).forEach((element) => {

    element.addEventListener('click', (e) => {

        console.log(e.target);

        let clickedSongIndex = parseInt(e.target.id);

        // SAME SONG dobara click hua
        if (songIndex === clickedSongIndex && !audioElement.paused) {

            audioElement.pause();

            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');

            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');

            gif.style.opacity = 0;

            return;
        }

        // DOOSRA SONG click hua
        MakeAllPlays();

        songIndex = clickedSongIndex;

        currentSongPlay = e.target;

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = `./songs/${songIndex + 1}.mp3`;

        masterSongName.innerText =
            songs[songIndex].songName;

        audioElement.currentTime = 0;

        audioElement.play();

        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    });

});


// PREVIOUS
document.getElementById('previous').addEventListener('click', () => {

    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }

    // song icon reset
    MakeAllPlays();

    // current song icon find
    let songButtons =
        Array.from(document.getElementsByClassName('song-item-play'));

    currentSongPlay = songButtons[songIndex];

    currentSongPlay.classList.remove('fa-play-circle');
    currentSongPlay.classList.add('fa-pause-circle');

    // song change
    audioElement.src = `./songs/${songIndex + 1}.mp3`;

    masterSongName.innerText =
        songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    gif.style.opacity = 1;

});


// NEXT
document.getElementById('next').addEventListener('click', () => {

    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    // song icon reset
    MakeAllPlays();

    // current song icon find
    let songButtons =
        Array.from(document.getElementsByClassName('song-item-play'));

    currentSongPlay = songButtons[songIndex];

    currentSongPlay.classList.remove('fa-play-circle');
    currentSongPlay.classList.add('fa-pause-circle');

    // song change
    audioElement.src = `./songs/${songIndex + 1}.mp3`;

    masterSongName.innerText =
        songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    gif.style.opacity = 1;

});