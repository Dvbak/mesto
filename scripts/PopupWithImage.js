import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(modal) {
    super(modal);
    this._image = this._selector.querySelector('.popup__image');
    console.log(this.image);
    this._caption = this._selector.querySelector('.popup__caption');
  }

  // openImg(link, name) {
  //   console.log(this);
  //   console.log(link);
  //   this._image.src = link;
  //   this._image.alt = name;
  //   this._caption.textContent = name;
  //   super.openPopup();
  // }
  openImg = (link, name) => {
    console.log(this);
    console.log(link);
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.openPopup();
  }
}
