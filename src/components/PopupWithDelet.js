/*  */

import Popup from './Popup.js';

export default class PopupWithDelet extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._modalForm = this._modal.querySelector('.popup__form');
    this._submitForm = formSubmit;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._deletCard, this._deletCardId);
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener('submit', this._handleSubmitForm);
  }

  openPopup = (card, cardId) => {
    this._deletCard = card;
    this._deletCardId = cardId;
    super.openPopup();
  }
}


