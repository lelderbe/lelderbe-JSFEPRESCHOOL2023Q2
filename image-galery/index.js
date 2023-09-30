document.addEventListener('DOMContentLoaded', () => {
    const imagesBlock = document.querySelector('.images__wrapper');

    function getDataAPI(search = 'spring') {
        // const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
        const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                console.log('data:', data);
                showImages(data.results);
            })
            .catch((err) => {
                console.err(err.message);
            });
    }

    function showImages(data) {
        console.log('showing data:', data);
        imagesBlock.innerHTML = data
            .map((item) => {
                return `<div style="background-image: url(${item.urls.small});"></div>`;

                // return `<img src="${item.urls.regular}" alt="${
                //     item.description || item.alt_description || ''
                // }">`;
            })
            .join('');
    }

    getDataAPI();
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
