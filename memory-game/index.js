document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, image: 'mercury.png' },
        { id: 2, image: 'venus.png' },
        { id: 3, image: 'earth.png' },
        { id: 4, image: 'mars.png' },
        { id: 5, image: 'alien.png' },
        { id: 6, image: 'astronaut.png' },
        { id: 7, image: 'star.png' },
        { id: 8, image: 'saturn.png' },
    ];

    const mapEl = document.querySelector('.map');

    const size = 12;
    let map;
    let closedCards;
    let picks;
    let steps;

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

    function getRandom(from, to) {
        console.log(from, to);
        const value = Math.floor(Math.random() * (to + 1 - from) + from);
        console.log(value);
        return value;
    }

    function generateMap(count) {
        mapEl.innerHTML = '';
        if (count % 2 !== 0 || count > size) {
            map = [];
            return;
        }
        const set = new Set();
        while (set.size < count) {
            const randomValue = getRandom(0, cards.length - 1);
            set.add(randomValue);
            console.log(set);
        }
        map = [...set].map((item) => [cards[item], cards[item]]).flat();
        shuffle(map);
        map.forEach((card) => {
            mapEl.append(getCardElement(card));
        });
    }

    function init() {
        generateMap(size / 2);
        if (map.length === 0) {
            console.log('Error generate map');
            return;
        }
        closedCards = map.length;
        steps = 0;
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
        steps++;
        if (picks[0].dataset.id !== picks[1].dataset.id) {
            setTimeout(() => {
                picks[0].classList.remove('opened');
                picks[1].classList.remove('opened');
                picks = [];
            }, 1000);
        } else {
            closedCards = closedCards - 2;
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
