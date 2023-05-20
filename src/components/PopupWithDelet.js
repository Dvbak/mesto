/*  */

import Popup from './Popup.js';

export default class PopupWithDelet extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._selectorForm = this._modal.querySelector('.popup__form');
    this._submitForm = formSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selectorForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this.deletCard);
    })
  }

  openPopup = (card) => {
    this.deletCard = card;
    console.log (this.deletCard);
    super.openPopup();
  }
}


