document.addEventListener('DOMContentLoaded', () => {
    const burgerMenuBtn = document.querySelector('#menu-button');
    const menu = document.querySelector('#menu');

    if (!burgerMenuBtn || !menu) {
        return;
    }

    burgerMenuBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('icon_burger-close');
        menu.classList.toggle('navigation_show');
    });
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
