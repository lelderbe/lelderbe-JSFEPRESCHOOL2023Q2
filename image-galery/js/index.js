document.addEventListener('DOMContentLoaded', () => {
    const imagesBlock = document.querySelector('.images__container');
    const form = document.querySelector('.header__form');
    const searchInput = document.querySelector('.search__input');
    const searchClear = document.querySelector('.search__cross-icon');
    const searchBtn = document.querySelector('.search__search-icon');
    const getMoreBtn = document.querySelector('.images__more');

    let images = [];
    let pageImages = [];
    let page = 1;
    let totalPages = 0;
    let searchValue;
    const limit = 30;

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        page = 1;
        searchValue = searchInput.value;
        images = [];
        getDataAPI(searchValue);
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    imagesBlock?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            return;
        }
        const id = e.target.dataset.id;
        const image = images.find((item) => item.id === id);
        openModal(image.urls.regular);
    });

    getMoreBtn?.addEventListener('click', (e) => {
        page++;
        getDataAPI(searchValue);
    });

    searchBtn?.addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
        searchInput.focus();
    });

    function getDataAPI(search = 'spring') {
        const accessKey = 'HrHmksJp42vVejDGK4i96ByiheX8__eMEbdQLAL3HQs';
        const url = `https://api.unsplash.com/search/photos?query=${search}&page=${page}&per_page=${limit}&orientation=landscape&client_id=${accessKey}`;

        fetch(url)
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                images.push(...data.results);
                pageImages = data.results;
                totalPages = data.total_pages;
                showImages();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function showImages() {
        if (!images.length) {
            imagesBlock.style.display = 'block';
            imagesBlock.innerHTML = `No images found for this search string: '${searchInput.value}'`;
            getMoreBtn.style.display = 'none';
            return;
        }
        imagesBlock.style.display = 'grid';
        if (page === 1) {
            imagesBlock.innerHTML = '';
        }
        content = pageImages
            .map((item) => {
                return `<div class="image__wrapper"><div class="images__image" data-id="${item.id}" style="background-image: url(${item.urls.small});"></div></div>`;
            })
            .join('');

        imagesBlock.insertAdjacentHTML('beforeend', content);
        getMoreBtn.style.display = page >= totalPages ? 'none' : 'flex';
    }

    initModal('.modal');
    getDataAPI(searchValue);
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
+10 Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения
  + добавен просмотр изображений
  + добавлена загрузка следующих изображений (если они есть)

  ____________________________
<  Я эксперт в своей области.  >
  ----------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`);
