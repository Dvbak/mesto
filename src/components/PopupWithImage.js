/*  */

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._modal.querySelector('.popup__image');
    this._caption = this._modal.querySelector('.popup__caption');
  }

  openPopup = (link, name) => {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.openPopup();
  }
}
