const tracks = [
    {
        id: 1,
        artist: 'Zlata Lari',
        title: 'Фиолетовые сны',
        audio: 'assets/audio/Zlata Lari - violet dreams.mp3',
        cover: 'assets/covers/Zlata Lari - violet dreams.jpg',
    },
    {
        id: 2,
        artist: 'Beyonce',
        title: "Don't Hurt Yourself",
        audio: 'assets/audio/beyonce.mp3',
        cover: 'assets/covers/lemonade.png',
    },
    {
        id: 3,
        artist: 'Dua Lipa',
        title: "Don't Start Now",
        audio: 'assets/audio/dontstartnow.mp3',
        cover: 'assets/covers/dontstartnow.png',
    },
];

document.addEventListener('DOMContentLoaded', () => {
    let trackNum = 0;
    let playState = false;
    let timeoutId;

    const audio = document.querySelector('#player');
    const backImage = document.querySelector('.bg');
    const trackCover = document.querySelector('.track__cover');
    const trackArtist = document.querySelector('.track__artist');
    const trackTitle = document.querySelector('.track__title');
    const trackPos = document.querySelector('.track__pos');
    const trackTime = document.querySelector('.track__time');
    const trackProgress = document.querySelector('.track__progress');
    const trackProgressBar = document.querySelector('.track__bar');
    const trackPlayButton = document.querySelector('#play-button');
    const trackPrevButton = document.querySelector('#prev-button');
    const trackNextButton = document.querySelector('#next-button');

    const progressBarWidth = +trackProgress.clientWidth;
    console.log('progressBarWidth:', progressBarWidth);

    if (!audio) {
        return;
    }

    audio.addEventListener('loadeddata', () => {
        console.log('[loadeddata] audio.duration:', audio.duration);
        // trackSeek.max = audio.duration;
        // trackSeek.value = audio.currentTime;
        // const ratio = audio.currentTime / audio.duration;
        // trackProgressBar.style.width = `${ratio * progressBarWidth}px`;
        trackProgressBar.style.width = 0;
        trackTime.textContent = getTime(audio.duration);
        trackPos.textContent = getTime(audio.currentTime);
        // console.log('trackSeek.value:', trackSeek.value);
        backImage.style.backgroundImage = `url("${tracks[trackNum].cover}")`;
        trackCover.style.backgroundImage = `url("${tracks[trackNum].cover}")`;
        trackArtist.textContent = tracks[trackNum].artist;
        trackTitle.textContent = tracks[trackNum].title;
        play();
    });

    audio.addEventListener('ended', (e) => {
        console.log('track ended, start next track');
        trackNextButton.dispatchEvent(new Event('click'));
    });

    audio.addEventListener('seeked', () => {
        console.log('seeked');
        updateProgressBar();
    });

    trackProgress.addEventListener('click', (e) => {
        // console.dir(e);
        // console.dir(e.target);
        // console.dir(e.currentTarget);
        // console.log('x:', e.offsetX, 'of:', e.currentTarget.clientWidth);
        // console.log('y:', e.offsetY, 'of:', e.currentTarget.clientHeight);
        const ratio = e.offsetX / progressBarWidth;
        audio.currentTime = ratio * audio.duration;
    });

    function updateProgressBar() {
        console.log('current position:', audio.currentTime);
        clearTimeout(timeoutId);
        trackPos.textContent = getTime(audio.currentTime);
        const ratio = audio.currentTime / audio.duration;
        trackProgressBar.style.width = `${ratio * progressBarWidth}px`;
        if (playState) {
            timeoutId = setTimeout(() => {
                updateProgressBar();
            }, 500);
        }
    }

    trackPlayButton.addEventListener('click', (e) => {
        e.preventDefault();
        playState = !playState;
        trackPlayButton.classList.toggle('pause');
        play();
    });

    trackPrevButton.addEventListener('click', (e) => {
        changeTrack(e, -1);
    });

    trackNextButton.addEventListener('click', (e) => {
        changeTrack(e, 1);
    });

    initTrack();
    refresh();

    function changeTrack(e, move) {
        e.preventDefault();
        const nextTrackNum = trackNum + move;
        trackNum = nextTrackNum < 0 ? tracks.length - 1 : nextTrackNum === tracks.length ? 0 : nextTrackNum;
        initTrack();
        // refresh();
    }

    function initTrack() {
        audio.src = tracks[trackNum].audio;
        console.log(audio.duration);
        // updateProgressBar();
    }

    function play() {
        console.log('audio.paused:', audio.paused);
        if (playState) {
            audio.play();
            updateProgressBar();
        } else {
            audio.pause();
            clearTimeout(timeoutId);
        }
    }

    function refresh() {}

    function getTime(time) {
        const minutes = `00${Math.floor(time / 60)}`.slice(-2);
        const seconds = `00${Math.floor(time % 60)}`.slice(-2);
        // console.log(`${minutes}:${seconds}`);
        return `${minutes}:${seconds}`;
    }
});

console.log(`
Score: 70 / 60


  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
