var audioList = [
    './musics/four.mp3',
    './musics/seven.mp3',
    './musics/six.mp3',
    './musics/two.mp3',
    './musics/seven.mp3',
    './musics/six.mp3',
    './musics/six.mp3'
];

var currentIndex = 1;
var audio = new Audio();
var isPlaying = false;
var resumeTime = 0;

// ... (rest of your code) ...

function playPauseAudio(index) {
    if (index === currentIndex) {
        togglePlayPause();
    } else {
        currentIndex = index;
        playAudio(audioList[currentIndex]);
    }
}

const audioSpearImage1 = document.getElementById('audioSpearImage1');
const audioSpearImage2 = document.getElementById('audioSpearImage2');

audioSpearImage1.addEventListener('click', () => {
    togglePlayPause();
});

audioSpearImage2.addEventListener('click', () => {
    togglePlayPause();
});

function playAudio(audioFile) {
    audio.src = audioFile;
    if (resumeTime > 0) {
        audio.currentTime = resumeTime;
    }
    audio.play();
    isPlaying = true;

    // When play music then moving the images
    audioSpearImage1.classList.add('img1');
    audioSpearImage2.classList.add('img2');
}

function pauseAudio() {
    isPlaying = false;
    resumeTime = audio.currentTime;
    audio.pause();

    // When stop music then moving stop the images
    audioSpearImage1.classList.remove('img1');
    audioSpearImage2.classList.remove('img2');
}

function togglePlayPause() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio(audioList[currentIndex]);
    }
}

// when button click
const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', () => {
    togglePlayPause();
});

// Progress bar and the Volume button

const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', resetProgressBar);

// Add a click event listener to the progress bar
progressBar.parentElement.addEventListener('click', adjustProgress);

function updateProgressBar() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
}

function resetProgressBar() {
    progressBar.style.width = '0';
}

function setVolume(volume) {
    audio.volume = volume / 100;
}

function adjustProgress(event) {
    const rect = progressBar.parentElement.getBoundingClientRect();
    const totalWidth = rect.width;
    const clickX = event.clientX - rect.left;

    const percent = (clickX / totalWidth) * 100;
    const newTime = (percent / 100) * audio.duration;

    audio.currentTime = newTime;
    updateProgressBar(); // Update the progress bar immediately
}

// Mute and Unmute

const micIconOn = document.getElementById('micIconOn');
const micIconMute = document.getElementById('micIconMute');

micIconOn.addEventListener('click', muteAudio);
micIconMute.addEventListener('click', unmuteAudio);

function muteAudio() {
    micIconOn.style.display = 'none';
    micIconMute.style.display = 'block';
    audio.muted = true;
}

function unmuteAudio() {
    micIconOn.style.display = 'block';
    micIconMute.style.display = 'none';
    audio.muted = false;
}
