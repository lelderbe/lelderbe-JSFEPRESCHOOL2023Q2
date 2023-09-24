const tracks = [
    { id: 1, title: 'lemonade', audio: 'assets/audio/beyonce.mp3', cover: 'assets/covers/lemonade.png' },
    {
        id: 2,
        title: 'dontstartnow',
        audio: 'assets/audio/dontstartnow.mp3',
        cover: 'assets/covers/dontstartnow.png',
    },
];

document.addEventListener('DOMContentLoaded', () => {
    let trackNum = 0;
    let playState = false;
    let timeoutId;

    const audio = document.querySelector('#player');
    const trackPos = document.querySelector('.track__pos');
    const trackTime = document.querySelector('.track__time');
    const trackSeek = document.querySelector('.track__seek');
    const trackPlayButton = document.querySelector('#play-button');
    const trackPrevButton = document.querySelector('#prev-button');
    const trackNextButton = document.querySelector('#next-button');

    if (!audio) {
        return;
    }

    audio.addEventListener('loadeddata', () => {
        console.log('[loadeddata] audio.duration:', audio.duration);
        trackSeek.max = audio.duration;
        trackSeek.value = audio.currentTime;
        trackTime.textContent = getTime(audio.duration);
        trackPos.textContent = getTime(audio.currentTime);
        // console.log('trackSeek.value:', trackSeek.value);
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

    trackSeek.addEventListener('click', (e) => {
        const pos = +e.target.value;
        clearTimeout(timeoutId);
        console.log('pos:', pos, 'e.target.value:', e.target.value);
        audio.currentTime = pos;
        trackPos.textContent = getTime(pos);
    });

    trackSeek.addEventListener('mousedown', (e) => {
        console.log('down pos:', e.target.value);
    });

    function updateProgressBar() {
        console.log('current position:', audio.currentTime);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            trackSeek.value = audio.currentTime;
            trackPos.textContent = getTime(audio.currentTime);
            updateProgressBar();
        }, 500);
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
