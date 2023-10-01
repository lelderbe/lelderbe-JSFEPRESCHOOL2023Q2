document.addEventListener('DOMContentLoaded', () => {
    const imagesBlock = document.querySelector('.images__wrapper');
    const form = document.querySelector('.header__form');
    const searchInput = document.querySelector('.search__input');
    const searchClear = document.querySelector('.search__cross-icon');

    let images = [];

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        getDataAPI(searchInput.value);
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    imagesBlock?.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        const image = images.find((item) => item.id === id);
        openModal(image.urls.regular, () => searchInput.focus());
    });

    function getDataAPI(search = 'spring') {
        const accessKey = 'HrHmksJp42vVejDGK4i96ByiheX8__eMEbdQLAL3HQs';
        const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=30&orientation=landscape&client_id=${accessKey}`;

        fetch(url)
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                images = data.results;
                showImages();
            })
            .catch((err) => {
                console.err(err.message);
            });
    }

    function showImages() {
        if (!images.length) {
            imagesBlock.style.display = 'block';
            imagesBlock.innerHTML = `No images found for this search string: '${searchInput.value}'`;
            return;
        }
        imagesBlock.style.display = 'grid';
        imagesBlock.innerHTML = images
            .map((item) => {
                return `<div class="image__wrapper"><div class="images__image" data-id="${item.id}" style="background-image: url(${item.urls.small});"></div></div>`;
            })
            .join('');
    }

    initModal('.modal');
    getDataAPI();
    searchInput.focus();
});

console.log(`
Score: 70 / 60

+10 Вёрстка
  + на странице есть несколько фото и строка поиска +5
  + в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
+10 При загрузке приложения на странице отображаются полученные от API изображения
+10 Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API
+30 Поиск
  + при открытии приложения курсор находится в поле ввода +5
  + есть placeholder +5
  + автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  + поисковый запрос можно отправить нажатием клавиши Enter +5
  + после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  + в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
+10 Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения
  + добавил просмотр изображений

  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
