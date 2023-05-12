import {
  initialCardsReverse,
  validationConfig,
  popUpEditProfile,
  btnEditProfile,
  popUpAddCard,
  btnAddCard,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';

/* Не знаю какой способ лучше для указания пути к картинкам в файле index.html, поэтому прописал два варианта. И все же что лучше при работе с Webpack: менять адреса в index.html или прописывать через index.js??? */
// import logo from './images/logo/logo.svg';
// const logoImg = document.querySelector('.header__logo');
// logoImg.src = logo;
// import avatar from './images/avatar.jpg';
// const avatarImg = document.querySelector('.profile__avatar');
// avatarImg.src = avatar;
// import edit from './images/icon/edit.svg';
// const editImg = document.querySelector('.profile__pic-edit');
// editImg.src = edit;
// import add from './images/icon/add.svg';
// const addImg = document.querySelector('.profile__pic-add');
// addImg.src = add;
// import close from './images/icon/close_icon.svg';
// const closeImg = document.querySelectorAll('.popup__pic-closed');
// closeImg.forEach((item) => item.src = close);

//Экземпляры валидаторов форм для каждого модального окна:
const editProfileFormValidator = new FormValidator(validationConfig, popUpEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, popUpAddCard);
addCardFormValidator.enableValidation();

//Экземпляры соответствующих всплывающих окон:
const popupImg = new PopupWithImage('.popup_img');
popupImg.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_add', addCardFormSubmit);
popupAddCard.setEventListeners();

//Экземпляр класса UserInfo:
const userInfo = new UserInfo({
  userNameSelector:'.profile__title',
  userAboutSelector: '.profile__subtitle'
});

//Создание карточек и загрузочного контента:
function createCard(itemCardsData) {
  const card = new Card(itemCardsData, popupImg.openPopup, '#card');
  return card.generateCard();
}

const cardsList = new Section({
  itemCardsData: initialCardsReverse,
  renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  }, '.elements__grid'
)
cardsList.renderAll();

btnEditProfile.addEventListener('click', btnEditProfileHandler);
function btnEditProfileHandler() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileFormValidator.cleaningForm();
  popupEditProfile.openPopup();
}

btnAddCard.addEventListener('click', btnAddCardHandler);
function btnAddCardHandler () {
  addCardFormValidator.cleaningForm();
  popupAddCard.openPopup();
}

function editFormSubmit(dataInput) {
  userInfo.setUserInfo(dataInput);
  popupEditProfile.closePopup();
}

function addCardFormSubmit(dataInput) {
  console.log(dataInput);
  cardsList.addItem(createCard(dataInput));
  popupAddCard.closePopup();
}
