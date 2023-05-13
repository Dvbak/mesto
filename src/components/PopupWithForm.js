/*  */

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._selectorForm = this._modal.querySelector('.popup__form');
    this._submitForm = formSubmit;
    this._inputsList = this._modal.querySelectorAll('.popup__input');
  }

  closePopup() {
    console.log('и я работаю!');
    super.closePopup();
    this._selectorForm.reset();
  }

  _getInputValues() {
    const inputValue = {};
    this._inputsList.forEach((item) => inputValue[item.name] = item.value);
    return inputValue;
  }

  setInputValues(dataInput) {
    this._inputsList.forEach((item) => item.value = dataInput[item.name]);
  }

  _handleSubmitForm = (event) => {
    event.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._selectorForm.addEventListener('submit', this._handleSubmitForm);
  }
}
