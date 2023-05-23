/*  */

export default class Section {
  constructor(renderer, selector) {
    // this._initialCardsArr = itemCardsData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    this._container.prepend(item);
    // this._container.append(item);
  }

  addItemAppend(item) {
    this._container.append(item);
  }

  renderAll(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }
}
