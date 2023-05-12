/*  */

export default class Section {
  constructor({ itemCardsData, renderer }, selector) {
    this._initialCardsArr = itemCardsData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderAll() {
    this._initialCardsArr.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
