import { booksAPI } from './booksAPI.js';

document.addEventListener('DOMContentLoaded', () => {
    // Local storage ---------------------------------------------------------------------------------------------
    const state = {
        // user: {
        //     firstName: null,
        //     lastName: null,
        //     email: null,
        //     password: null,
        // },
    };

    state.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;

    console.log('state:', state);

    function addModalListeners({ button, panel, buttonClass, hideModalClass, showModalClass }) {
        const modalOpenButton = document.querySelector(button);
        const modalBody = document.querySelector(panel);
    
        // if (!modalOpenButton || !modalBody) {
        if (!modalBody) {
            return;
        }
    
        modalOpenButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (buttonClass) modalOpenButton?.classList.toggle(buttonClass);
            if (hideModalClass) modalBody.classList.toggle(hideModalClass);
            if (showModalClass) modalBody.classList.toggle(showModalClass);
        });
    
        modalBody.addEventListener('click', (e) => {
            if (e.target.localName !== 'a') {
                e.stopPropagation();
            }
        });
    
        document.body.addEventListener('click', () => {
            if (buttonClass) modalOpenButton?.classList.remove(buttonClass);
            if (hideModalClass) modalBody.classList.add(hideModalClass);
            if (showModalClass) modalBody.classList.remove(showModalClass);
        });
    }

    // Burger menu -----------------------------------------------------------------------------------------------
    // const burgerMenuBtn = document.querySelector('#menu-button');
    // const menuPanel = document.querySelector('#menu');

    // if (!burgerMenuBtn || !menuPanel) {
    //     return;
    // }

    // burgerMenuBtn.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     burgerMenuBtn.classList.toggle('icon_burger-close');
    //     menuPanel.classList.toggle('navigation_show');
    // });

    // menuPanel.addEventListener('click', (e) => {
    //     if (e.target.localName !== 'a') {
    //         e.stopPropagation();
    //     }
    // });

    // document.body.addEventListener('click', () => {
    //     burgerMenuBtn.classList.remove('icon_burger-close');
    //     menuPanel.classList.remove('navigation_show');
    // });

    // addModalListeners('#menu-button', '#menu', 'icon_burger-close', 'navigation_show');
    addModalListeners({ button: '#menu-button', panel: '#menu', buttonClass: 'icon_burger-close', showModalClass: 'navigation_show' });

    // Profile menu -----------------------------------------------------------------------------------------
    // const profileMenuBtn = document.querySelector('.icon_profile');
    // const profileMenu = document.querySelector('.profile');

    // profileMenuBtn.addEventListener('click', () => {
    //     profileMenu.classList.toggle('profile_hide');
    // });

    addModalListeners({ button: '.icon_profile', panel: '.profile', hideModalClass: 'profile_hide' });

    // About ------------------------------------------------------------------------------------------------
    const dotsParent = document.querySelector('.slider__dots');
    const dots = [...dotsParent.children];
    const sliderContent = document.querySelector('.slider__content');
    const prevBtn = document.querySelector('.slider__prev');
    const nextBtn = document.querySelector('.slider__next');
    const IMAGES_WIDTH = 450;
    const IMAGES_GAP = 25;
    let activeDotIndex = 0;

    function updateDots() {
        dots.forEach((item, index) => {
            if (index === activeDotIndex) {
                item.classList.add('dot_active');
            } else {
                item.classList.remove('dot_active');
            }
        });
    }

    function slidePictures() {
        const dx = -(IMAGES_WIDTH + IMAGES_GAP) * activeDotIndex;
        sliderContent.style.translate = `${dx}px`;
    }

    function updateButtonsVisibility() {
        if (activeDotIndex === 0) {
            prevBtn.classList.add('inactive');
        } else {
            prevBtn.classList.remove('inactive');
        }
        if (activeDotIndex === dots.length - 1) {
            nextBtn.classList.add('inactive');
        } else {
            nextBtn.classList.remove('inactive');
        }
    }

    function refresh() {
        updateDots();
        updateButtonsVisibility();
        slidePictures();
    }

    dotsParent.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.dot')) {
            activeDotIndex = dots.findIndex((item) => item === e.target);
            refresh();
        }
    });

    prevBtn.addEventListener('click', () => {
        activeDotIndex--;
        refresh();
    });

    nextBtn.addEventListener('click', () => {
        activeDotIndex++;
        refresh();
    });

    refresh();

    // Favorites ------------------------------------------------------------------------------------------------
    const radioButtonsParent = document.querySelector('.favorites__seasons');
    const books = document.querySelectorAll('.books');

    radioButtonsParent.addEventListener('click', (e) => {
        books.forEach((item) => {
            if (e.target?.id.split('-')[1] === item.dataset.season) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    books.forEach((item) => {
        const season = item.dataset.season;
        item.innerHTML = booksAPI[season]
            .map((book) => {
                return `
                    <article class="book">
                        <div class="book__frame">
                            <p class="book__label">Staff Picks</p>
                            <h3 class="book__title">${book.title}</h3>
                            <p class="book__author">By ${book.author}</p>
                            <p class="book__text">${book.text}</p>
                            <button class="button book__button">Buy</button>
                        </div>
                        <img class="book__image" src="./assets/img/favorites/${book.image}" alt="${book.title}">
                    </article>
                `;
            })
            .join('');
    });
});

console.log(`
Score: 50 / 200

1. Вёрстка соответствует макету. Ширина экрана 768px (26/26)
2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (12/12)
3. На ширине экрана 768рх реализовано адаптивное меню (12/12)

  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
