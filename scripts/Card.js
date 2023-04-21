class Card {
  constructor(cardsData, selector) {
    this._name = cardsData.name;
    this._link = cardsData.link;
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

  _handlerOpenImg() {
    imagePopUpImg.src = this._link;
    imagePopUpImg.alt = this._name;
    captionPopUpImg.textContent = this._name;
    openPopUp(popUpImg);
  }

  _setEventListeners() {
    this._clonTemplate.querySelector('.elements__btn').addEventListener('click', () => {
      this._handlerAddLike();
    });
    this._clonTemplate.querySelector('.elements__btn-delet').addEventListener('click', () => {
      this._handlerDeletCard();
    });
    this._clonTemplate.querySelector('.elements__img').addEventListener('click', () => {
      this._handlerOpenImg();
    });
  }
}


