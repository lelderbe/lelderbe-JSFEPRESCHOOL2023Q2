document.addEventListener('DOMContentLoaded', () => {
    let top10 = JSON.parse(localStorage.getItem('top10')) || [];

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

    const modal = new Modal('#modal');
    const acceptModalBtn = modal.root.querySelector('.accept-btn');
    const cancelModalBtn = modal.root.querySelector('.cancel-btn');
    const top10ModalBtn = modal.root.querySelector('.top10-btn');

    const modalTop10 = new Modal('#top10');
    const acceptModalTop10Btn = modalTop10.root.querySelector('.accept-btn');
    const cancelModalTop10Btn = modalTop10.root.querySelector('.cancel-btn');
    const clearModalTop10Btn = modalTop10.root.querySelector('.clear-btn');
    modalTop10.text.style.whiteSpace = 'unset';

    const tools = document.querySelector('.tools');
    const top10Btn = tools.querySelector('.top10-btn');
    const currentSteps = tools.querySelector('.tools__steps');

    top10Btn.onclick = () => {
        modalTop10.openModal();
    };

    acceptModalBtn.onclick = () => {
        modal.closeModal();
        init();
    };

    cancelModalBtn.onclick = () => {
        modal.closeModal();
    };

    top10ModalBtn.onclick = () => {
        modal.closeModal();
        modalTop10.openModal();
    };

    acceptModalTop10Btn.onclick = () => {
        modalTop10.closeModal();
        init();
    };

    cancelModalTop10Btn.onclick = () => {
        modalTop10.closeModal();
    };

    clearModalTop10Btn.onclick = () => {
        top10 = [];
        localStorage.setItem('top10', JSON.stringify(top10));
        modalTop10.onOpen();
    };

    modalTop10.onOpen = () => {
        const header = `
            <div class="top10__row">
                <span class="top10__date">Когда</span>
                <span class="top10__steps">Шагов</span>
            </div>
            <div class="top10__row">
                <span class="top10__date">-------------</span>
                <span class="top10__steps">-------------</span>
            </div>
        `;

        modalTop10.text.innerHTML =
            header +
            top10
                .map((item) => {
                    const date = new Date(item.id).toLocaleDateString('ru-RU');
                    return `
                        <div class="top10__row">
                            <span class="top10__date">${date}</span>
                            <span class="top10__steps">${item.steps}</span>
                        </div>
                    `;
                })
                .join('');
    };

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
        return Math.floor(Math.random() * (to + 1 - from) + from);
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
        currentSteps.textContent = `Сделано шагов: ${steps}`;
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
        if (e.currentTarget === e.target || picks.length === 2) {
            return;
        }
        const card = e.target.parentElement;
        if (card.classList.contains('opened')) {
            return;
        }
        card.classList.add('opened');
        picks.push(card);
        if (picks.length < 2) {
            return;
        }
        steps++;
        currentSteps.textContent = `Сделано шагов: ${steps}`;
        if (picks[0].dataset.id !== picks[1].dataset.id) {
            setTimeout(() => {
                picks[0].classList.remove('opened');
                picks[1].classList.remove('opened');
                picks = [];
            }, 1000);
        } else {
            closedCards = closedCards - 2;
            picks = [];
            checkGameOver();
        }
    }

    function checkGameOver() {
        if (closedCards === 0) {
            top10.push({
                id: Date.now(),
                steps: steps,
            });
            modal.text.textContent = `Игра закончена.

                Вы прошли игру за ${steps} ${words(steps, [
                'ход',
                'хода',
                'ходов',
            ])}!

            `;
            top10.sort((a, b) => a.steps - b.steps);
            top10 = top10.slice(0, 10);
            localStorage.setItem('top10', JSON.stringify(top10));
            modal.openModal();
        }
    }

    function words(n, words) {
        let index = 2;
        if (n % 10 === 1 && n % 100 !== 11) {
            index = 0;
        } else if (
            n % 10 >= 2 &&
            n % 10 <= 4 &&
            (n % 100 < 10 || n % 100 >= 20)
        ) {
            index = 1;
        }
        return words[index];
    }

    init();
});

console.log(`
Score: 60 / 60

[+] Вёрстка +10
    [+] реализован интерфейс игры +5
    [+] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
[+] Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
[+] Игра завершается, когда открыты все карточки +10
[+] По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
[+] Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
[+] По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10

  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
