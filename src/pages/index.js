import {
  validationConfig,
  popUpEditProfile,
  btnEditProfile,
  popUpAddCard,
  btnAddCard,
  popUpUpdateAvatar,
  updateAvatar,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelet from '../components/PopupWithDelet.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css';


//Экземпляр Api класса:
// const api = new Api();
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd0edf2d6-11aa-4cde-8f41-dce7ef9dc184',
    'Content-Type': 'application/json'
  }
});

//Экземпляры валидаторов форм для каждого модального окна с формой:
const editProfileFormValidator = new FormValidator(validationConfig, popUpEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, popUpAddCard);
addCardFormValidator.enableValidation();
const updateAvatarFormValidator = new FormValidator(validationConfig, popUpUpdateAvatar);
updateAvatarFormValidator.enableValidation();

//Экземпляры соответствующих всплывающих окон:
const popupImg = new PopupWithImage('.popup_img');
popupImg.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_add', addCardFormSubmit);
popupAddCard.setEventListeners();
const popupUpdateAvatar = new PopupWithForm('.popup_update', updateAvatarFormSubmit);
popupUpdateAvatar.setEventListeners();
const popupDeletCard = new PopupWithDelet('.popup_delet', deletCardFormSubmit);
popupDeletCard.setEventListeners();

//Экземпляр класса UserInfo:
const userInfo = new UserInfo({
  userNameSelector:'.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});


//Функция переключения лайков:
const switchLikes = (cardId, card) => {
  if (card.getIsMyLike()) {
   api.deletLike(cardId)
     .then(res => {
       card.changeLike(res.likes)
     })
     .catch(err => console.error('Ошибка удаления лайка: ', err.message))
  } else {
   api.addLike(cardId)
     .then(res => {
       card.changeLike(res.likes);
     })
     .catch(err => console.error('Ошибка добавления лайка: ', err.message))
  }
 }

//Создание карточек и загрузочного контента:
function createCard(itemCardsData) {
  const card = new Card(itemCardsData, popupImg.openPopup, popupDeletCard.openPopup, switchLikes,
  '#card');
  return card.generateCard();
}

const cardsList = new Section((item) => {
    cardsList.addItem(createCard(item));
  }, '.elements__grid')

// cardsList.renderAll(initialCardsReverse);

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

updateAvatar.addEventListener('click', btnUpdateAvatarHandler);
function btnUpdateAvatarHandler () {
  updateAvatarFormValidator.cleaningForm();
  popupUpdateAvatar.openPopup();
}

function editFormSubmit(dataInput) {
  api.setInfoProfile(dataInput)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .catch(err => console.error('Ошибка изменения профиля: ', err.message))
    .finally(() => popupEditProfile.resetTextLoader());
  popupEditProfile.closePopup();
}

function addCardFormSubmit(dataInput) {
  Promise.all([api.getInfo(), api.addCard(dataInput)])
    .then(([dataUser, dataCard]) => {
      dataCard.myId = dataUser._id;
      cardsList.addItem(createCard(dataCard))
    })
    .catch(err => console.error('Ошибка добавления новой карточки: ', err.message))
    .finally(() => popupAddCard.resetTextLoader());
  popupAddCard.closePopup();
}

function updateAvatarFormSubmit(dataInput) {
  api.setAvatar(dataInput)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .catch(err => console.error('Ошибка изменения аватара: ', err.message))
    .finally(() => popupUpdateAvatar.resetTextLoader());
  popupUpdateAvatar.closePopup();
}

function deletCardFormSubmit(card, cardId) {
  api.deletCard(cardId)
    .then(() => {
      card.deletCard();
    })
    .catch(err => console.error('Ошибка удаления карточки: ', err.message))
    .finally()
  popupDeletCard.closePopup();
}

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([dataUser, dataCards]) => {
    console.log(dataUser);
    // console.log(dataCards);
    dataCards.forEach(card => card.myId = dataUser._id);
    userInfo.setUserInfo(dataUser);
    console.log(userInfo.getUserInfo().avatar);
    cardsList.renderAll(dataCards.reverse());
  })
  .catch(err => console.error('Ошибка загрузки страницы: ', err.message))
