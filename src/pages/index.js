import {
  initialCardsReverse,
  validationConfig,
  popUpEditProfile,
  btnEditProfile,
  popUpAddCard,
  btnAddCard,
  popUpUpdateAvatar,
  btnUpdateAvatar,
  popUpDeletCard
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';


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

btnUpdateAvatar.addEventListener('click', btnUpdateAvatarHandler);
function btnUpdateAvatarHandler () {
  updateAvatarFormValidator.cleaningForm();
  popupUpdateAvatar.openPopup();
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

function updateAvatarFormSubmit(dataInput) {
  btnUpdateAvatar.src = dataInput.link;
  console.log(dataInput);
  popupUpdateAvatar.closePopup();
}
