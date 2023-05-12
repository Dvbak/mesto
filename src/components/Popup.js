/* Данный класс отвечает за открытие и закрытие модальных окон. Принимает в конструктор класса селектор всплывающего окна. */

export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._btnClose = this._selector.querySelector('.popup__closed');
  }

  openPopup() {
    console.log('i work?????');
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
    this.closePopup();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup()
      }
    });
    this._btnClose.addEventListener('click', () => {
      this.closePopup();
    });
  }
}
