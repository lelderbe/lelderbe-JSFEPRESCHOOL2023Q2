document.addEventListener('DOMContentLoaded', () => {
    const imagesBlock = document.querySelector('.images__wrapper');
    const form = document.querySelector('.header__form');
    const searchInput = document.querySelector('.search__input');
    const searchClear = document.querySelector('.search__cross-icon');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        getDataAPI(searchInput.value);
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
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
                showImages(data.results);
            })
            .catch((err) => {
                console.err(err.message);
            });
    }

    function showImages(data) {
        if (!data.length) {
            imagesBlock.innerHTML = `No images found for this search string: '${searchInput.value}'`;
            return;
        }
        imagesBlock.innerHTML = data
            .map((item) => {
                return `<div style="background-image: url(${item.urls.small});"></div>`;
            })
            .join('');
    }

    getDataAPI();
    searchInput.focus();
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
