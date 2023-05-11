/*  */

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(modal, formSubmit) {
    super(modal);
    this._selectorForm = this._selector.querySelector('.popup__form');
    this._submitForm = formSubmit;
    this._inputsList = this._selector.querySelectorAll('.popup__input');
  }

  closePopup() {
    console.log('и я работаю!');
    super.closePopup();
    this._selectorForm.reset();
  }

  _getInputValues() {
    const inputValues = Array.from(this._inputsList).map((item) => {
      const { name, value } = item;
      return { name, value };
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._selectorForm.addEventListener('submit', this._submitForm);
  }
}
