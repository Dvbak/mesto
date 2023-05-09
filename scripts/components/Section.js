/*  */

export default class Section {
  constructor({ itemCardsData, renderer }, selector) {
    this._initialCardsArr = itemCardsData.slice().reverse();
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderAll() {
    this._initialCardsArr.forEach((item) => {
      this._renderer(item);
      console.log('I work!!');
    })
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
