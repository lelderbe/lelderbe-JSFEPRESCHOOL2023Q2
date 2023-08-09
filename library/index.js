document.addEventListener('DOMContentLoaded', () => {
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
    })
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
