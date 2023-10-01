let modal;
let modalInner;

function initModal(selector) {
    modal = document.querySelector(selector);
    modalInner = modal.querySelector('.modal__inner');

    modal.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('wheel', (e) => {
        e.preventDefault();
    });
}

function openModal(image) {
    document.addEventListener('keydown', handleKeyDown);
    modal.style.opacity = 1;
    modal.style.zIndex = 1;
    modalInner.style.backgroundImage = `url(${image})`;
}

function closeModal() {
    document.removeEventListener('keydown', handleKeyDown);
    modal.style.opacity = 0;
    modal.style.zIndex = -1;
}

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    }
}
