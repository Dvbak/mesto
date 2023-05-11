export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputHintClass: 'popup__input-hint_attached'
};

export const popUpImg = document.querySelector('.popup_img');
export const popUpEditProfile = document.querySelector('.popup_edit');
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const popUpAddCard = document.querySelector('.popup_add');
export const btnAddCard = document.querySelector('.profile__btn-add');

const inputName = popUpEditProfile.querySelector('.popup__input_name_name');
const inputAbout = popUpEditProfile.querySelector('.popup__input_name_about');
export const dataInputs = {
  name: inputName,
  about: inputAbout
}
export const inputPlace = popUpAddCard.querySelector('.popup__input_name_place')
export const inputLink = popUpAddCard.querySelector('.popup__input_name_link')
