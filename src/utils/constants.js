export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputHintClass: 'popup__input-hint_attached'
};

export const popUpEditProfile = document.querySelector('.popup_edit');
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const formEditProfile = popUpEditProfile.querySelector('.popup__form');
export const popUpAddCard = document.querySelector('.popup_add');
export const btnAddCard = document.querySelector('.profile__btn-add');
export const formAddCard = popUpAddCard.querySelector('.popup__form');
export const popUpUpdateAvatar = document.querySelector('.popup_update');
export const updateAvatar = document.querySelector('.profile__avatar');
export const formUpdateAvatar = popUpUpdateAvatar.querySelector('.popup__form');
