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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputHintClass: 'popup__input-hint_attached'
};

const cardsGrid = document.querySelector('.elements__grid');
const popUpImg = document.querySelector('.popup_img');
const imagePopUpImg = popUpImg.querySelector('.popup__image');
const captionPopUpImg = popUpImg.querySelector('.popup__caption');

const popUps = document.querySelectorAll('.popup');
const popUpEditProfile = document.querySelector('.popup_edit');
const btnEditProfile = document.querySelector('.profile__btn-edit');
const popUpAddCard = document.querySelector('.popup_add');
const btnAddCard = document.querySelector('.profile__btn-add');
const buttonsClose = document.querySelectorAll('.popup__closed');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const formPopupEditProfile = popUpEditProfile.querySelector('.popup__form');
const inputName = popUpEditProfile.querySelector('.popup__input_name_name');
const inputAbout = popUpEditProfile.querySelector('.popup__input_name_about');
const formPopupAddCard = popUpAddCard.querySelector('.popup__form');
const inputPlace = popUpAddCard.querySelector('.popup__input_name_place')
const inputLink = popUpAddCard.querySelector('.popup__input_name_link')
