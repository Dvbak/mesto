/*  */

export default class Card {
  constructor(cardsData, handlerOpenImg, handlerDeletCard, switchLikes, selector) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._myId = cardsData.myId;
    this._ownerId = cardsData.owner._id;
    this._cardId = cardsData._id;
    this._likes = cardsData.likes;
    this._likesLength = cardsData.likes.length;
    this._handlerOpenImg = handlerOpenImg;
    this._handlerDeletCard = handlerDeletCard;
    this._switchLikes = switchLikes;
    this._selector = selector;
  }

  _handlerAddLike() {
    this._switchLikes(this._cardId, this);
    // this._likeBtn.classList.toggle('elements__btn_like');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handlerAddLike());

    this._deletBtn.addEventListener('click', () => this._handlerDeletCard(this, this._cardId));

    this._cardImg.addEventListener('click', () => this._handlerOpenImg(this._link, this._name));
  }

  _hasMyLike() {
    if (this._likes.find(item => item._id === this._myId)) {
      this._likeBtn.classList.add('elements__btn_like');
    }
    this._counter.textContent = this._likesLength;
  }

  _removeDeletBtn() {
    if (this._myId !== this._ownerId) {
      this._deletBtn.remove();
    }
  }

  _getTemplate() {
    const clonTemplateCard = document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);

    return clonTemplateCard;
  }

  generateCard() {
    this._clonTemplate = this._getTemplate();

    this._cardImg = this._clonTemplate.querySelector('.elements__img');
    this._likeBtn = this._clonTemplate.querySelector('.elements__btn');
    this._deletBtn = this._clonTemplate.querySelector('.elements__btn-delet');
    this._counter = this._clonTemplate.querySelector('.elements__count');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._clonTemplate.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();
    this._removeDeletBtn();
    this._hasMyLike();
    return this._clonTemplate;
  }

  deletCard() {
    this._deletBtn.closest('.elements__item').remove();
  }

  changeLike(likes) {
    this._counter.textContent = likes.length;
    this._likeBtn.classList.toggle('elements__btn_like');
  }

  getIsMyLike() {
    return this._likeBtn.classList.contains('elements__btn_like');
  }

}
