/* Класс Card предназначен для создания карточек с названием, ссылкой на фото, лайком и кнопкой удаления. Принимает в конструктор ссылки на изображение и заголовок (cardsData), а также селектор шаблона разметки (selector). Содержит защищенные методы для обработчиков событий и их установки:
_handlerAddLike() - добавление/удалени лайков;
_handlerDeletCard() - удаление карточки;
Имеется публичный метод generateCard(), который возвращает заполненную данными и работоспособную карточку.
Данный класс импортируется в файл index.js в котором и создаются экземпляры для каждой карточки */

export default class Card {
  constructor(cardsData, handlerOpenImg, selector) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._handlerOpenImg = handlerOpenImg;
    this._selector = selector;
  }

  _getTemplate() {
    const clonTemplateCard = document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);

    return clonTemplateCard;
  }

  generateCard() {
    this._clonTemplate = this._getTemplate();

    this._clonTemplate.querySelector('.elements__img').src = this._link;
    this._clonTemplate.querySelector('.elements__img').alt = this._name;
    this._clonTemplate.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();

    return this._clonTemplate;
  }

  _handlerAddLike() {
    this._clonTemplate.querySelector('.elements__btn').classList.toggle('elements__btn_like');
  }

  _handlerDeletCard() {
    this._clonTemplate.querySelector('.elements__btn-delet').closest('.elements__item').remove();
  }
  // _handlerOpenImg() {
  //   this._handleOpenImg(this._link, this._name);
  // }

  _setEventListeners() {
    this._clonTemplate.querySelector('.elements__btn').addEventListener('click', () => this._handlerAddLike());

    this._clonTemplate.querySelector('.elements__btn-delet').addEventListener('click', () => this._handlerDeletCard());

    this._clonTemplate.querySelector('.elements__img').addEventListener('click', () => this._handlerOpenImg(this._link, this._name));
  }
}
