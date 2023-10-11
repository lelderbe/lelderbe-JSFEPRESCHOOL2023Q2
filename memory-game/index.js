document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, image: 'mercury.png' },
        { id: 2, image: 'venus.png' },
        { id: 3, image: 'earth.png' },
        { id: 4, image: 'mars.png' },
    ];

    const mapEl = document.querySelector('.map');

    let map;
    let count;
    let picks;

    function getCardElement(data) {
        const card = document.createElement('div');
        card.dataset.id = data.id;
        card.classList.add('card');
        card.innerHTML = `
                <img class="front" src="img/cover.jpg" alt="">
                <img class="back" src="img/${data.image}" alt="">
        `;
        return card;
    }

    function init() {
        mapEl.innerHTML = '';
        map = [cards[2], cards[2], cards[3], cards[3]];
        count = map.length;
        shuffle(map);
        map.forEach((card) => {
            mapEl.append(getCardElement(card));
        });
        mapEl.onclick = (e) => handleCardClick(e);
        picks = [];
    }

    /**
     * Тасование Фишера-Йетса
     */
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function handleCardClick(e) {
        if (e.currentTarget === e.target) {
            console.log('e.currentTarget === e.target - exit');
            return;
        }
        if (picks.length === 2) {
            return;
        }
        const card = e.target.parentElement;
        // console.log('card:', card);
        if (card.classList.contains('opened')) {
            console.log('already opened - exit');
            return;
        }
        card.classList.add('opened');
        picks.push(card);
        if (picks.length < 2) {
            return;
        }
        if (picks[0].dataset.id !== picks[1].dataset.id) {
            setTimeout(() => {
                picks[0].classList.remove('opened');
                picks[1].classList.remove('opened');
                picks = [];
            }, 1000);
        } else {
            count = count - 2;
            picks = [];
        }
    }

    init();
});

console.log(`
Score: 0 / 60


  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
