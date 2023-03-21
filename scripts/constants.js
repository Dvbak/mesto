const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardsGrid = document.querySelector('.elements__grid');
const cardTemplate = cardsGrid.querySelector('#card').content;
const popUpImg = document.querySelector('.popup_img');
const imagePopUpImg = popUpImg.querySelector('.popup__image');
const captionPopUpImg = popUpImg.querySelector('.popup__caption');

const popUpEditProfile = document.querySelector('.popup_edit');
const btnEditProfile = document.querySelector('.profile__btn-edit');
const popUpAddCard = document.querySelector('.popup_add');
const btnAddCard = document.querySelector('.profile__btn-add');
const buttonsClose = document.querySelectorAll('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopupEditProfile = popUpEditProfile.querySelector('.popup__form');
let inputName = popUpEditProfile.querySelector('.popup__input_name_name');
let inputAbout = popUpEditProfile.querySelector('.popup__input_name_about');
let formPopupAddCard = popUpAddCard.querySelector('.popup__form');
let inputPlace = popUpAddCard.querySelector('.popup__input_name_place');
let inputLink = popUpAddCard.querySelector('.popup__input_name_link');
