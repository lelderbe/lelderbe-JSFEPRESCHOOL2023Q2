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
        cover: 'assets/covers/lemonade.jpg',
    },
    {
        id: 3,
        artist: 'Dua Lipa',
        title: "Don't Start Now",
        audio: 'assets/audio/dontstartnow.mp3',
        cover: 'assets/covers/dontstartnow.jpg',
    },
];

document.addEventListener('DOMContentLoaded', () => {
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

    let trackNum = 0;
    let playState = false;
    const progressBarWidth = +trackProgress.clientWidth;

    if (!audio || !tracks.length) {
        return;
    }

    /**
     * Update track cover, info, progress bar after load audio file or manually change track position
     */
    audio.addEventListener('canplay', () => {
        trackTime.textContent = getTime(audio.duration);
        backImage.style.backgroundImage = `url("${tracks[trackNum].cover}")`;
        trackCover.style.backgroundImage = `url("${tracks[trackNum].cover}")`;
        trackArtist.textContent = tracks[trackNum].artist;
        trackTitle.textContent = tracks[trackNum].title;
        play();
        audio.dispatchEvent(new Event('timeupdate'));
    });

    /**
     * After finish current track, switch to the next one
     */
    audio.addEventListener('ended', () => {
        trackNextButton.dispatchEvent(new Event('click'));
    });

    /**
     * Update track's current time and progress bar when audio.currentTime changed
     */
    audio.addEventListener('timeupdate', () => {
        const ratio = audio.currentTime / audio.duration;
        trackProgressBar.style.width = `${Math.round(ratio * progressBarWidth)}px`;
        trackPos.textContent = getTime(audio.currentTime);
    });

    trackProgress.addEventListener('click', (e) => {
        const ratio = e.offsetX / progressBarWidth;
        audio.currentTime = ratio * audio.duration;
    });

    trackPlayButton.addEventListener('click', (e) => {
        e.preventDefault();
        playState = !playState;
        trackPlayButton.classList.toggle('pause');
        play();
    });

    trackPrevButton.addEventListener('click', (e) => {
        e.preventDefault();
        changeTrack(-1);
    });

    trackNextButton.addEventListener('click', (e) => {
        e.preventDefault();
        changeTrack(1);
    });

    function changeTrack(move = 0) {
        const nextTrackNum = trackNum + move;
        trackNum = nextTrackNum < 0 ? tracks.length - 1 : nextTrackNum === tracks.length ? 0 : nextTrackNum;
        audio.currentTime = 0;
        audio.src = tracks[trackNum].audio;
        audio.load();
    }

    function play() {
        if (playState) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    function getTime(time) {
        const minutes = `00${Math.floor(time / 60)}`.slice(-2);
        const seconds = `00${Math.floor(time % 60)}`.slice(-2);
        return `${minutes}:${seconds}`;
    }

    changeTrack();
});

console.log(`
Score: 60 / 60

- Вёрстка +10
- Кнопка Play/Pause +10
- При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
- При смене аудиотрека меняется изображение - обложка аудиотрека +10
- Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
- Отображается продолжительность аудиотрека и его текущее время проигрывания +10


  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
