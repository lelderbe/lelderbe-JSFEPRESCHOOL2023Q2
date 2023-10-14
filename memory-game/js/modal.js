/**
 * Modal component
 * @param selector - root of modal, DOM div element id, ex: '#modal_create_slot'
 *
 * Minimum html template is:
 *
 *  <div class="uikit-modal" id="modal_create_slot">
 *      <div class="uikit-modal__inner">
 *          <div class="uikit-modal__title">Создание слота</div>
 *          <div class="uikit-modal__text"></div>
 *      </div>
 *  </div>
 *
 * Properties:
 * modal.inner - you can style modal width, margins and any other style
 * modal.title - title element
 * modal.text - put here any text or html (via modal.text.innerHTML)
 *
 * Methods:
 * onOpen - put here your function that will be called after open modal (ex: fetch API)
 * onClose - put here your function that will be called before close modal
 * openModal - open modal
 * closeModal - close modal
 *
 */
class Modal {
    constructor(selector) {
        this.root = document.querySelector(selector);
        if (!this.root) {
            return;
        }

        this.inner = this.root.querySelector('.uikit-modal__inner');
        this.title = this.root.querySelector('.uikit-modal__title');
        this.text = this.root.querySelector('.uikit-modal__text');

        this.inner?.insertAdjacentHTML(
            'afterbegin',
            `<img class="uikit-modal__close-icon" src="img/icon-cross.svg">`
        );
        this._crossBtn = this.root.querySelector('.uikit-modal__close-icon');
        if (this._crossBtn) {
            this._crossBtn.onclick = () => this.closeModal();
        }

        this.root.onclick = (e) => {
            e.stopPropagation();
            if (e.target === this.root) {
                this.closeModal();
            }
        };
    }

    _handleKeyDown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            this.closeModal();
        }
    }

    openModal() {
        this._onKeyDownListener = document.onkeydown;
        document.onkeydown = (e) => this._handleKeyDown(e);
        this.root.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.onOpen();
    }

    onOpen() {}

    closeModal() {
        this.onClose();
        document.onkeydown = this._onKeyDownListener;
        this.root.style.display = 'none';
        document.body.style.overflow = '';
    }

    onClose() {}
}
