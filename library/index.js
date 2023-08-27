document.addEventListener('DOMContentLoaded', () => {
    // Burger menu -----------------------------------------------------------------------------------------------
    const burgerMenuBtn = document.querySelector('#menu-button');
    const menuPanel = document.querySelector('#menu');

    if (!burgerMenuBtn || !menuPanel) {
        return;
    }

    burgerMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerMenuBtn.classList.toggle('icon_burger-close');
        menuPanel.classList.toggle('navigation_show');
    });

    menuPanel.addEventListener('click', (e) => {
        if (e.target.localName !== 'a') {
            e.stopPropagation();
        }
    });

    document.body.addEventListener('click', () => {
        burgerMenuBtn.classList.remove('icon_burger-close');
        menuPanel.classList.remove('navigation_show');
    });

    // About dots ------------------------------------------------------------------------------------------------
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
});

console.log(`
Score: 50 / 50

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
