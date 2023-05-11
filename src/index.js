import {
  initialCards,
  validationConfig,
  popUpImg,
  popUpEditProfile,
  btnEditProfile,
  popUpAddCard,
  btnAddCard,
  dataInputs,
  inputLink,
  inputPlace
} from './utils/constants.js';

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import './pages/index.css';

/* Не знаю какой способ лучше для указания пути к картинкам в файле index.html, поэтому прописал два варианта */
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
const popupImg = new PopupWithImage(popUpImg);
const popupEditProfile = new PopupWithForm(popUpEditProfile, editFormSubmit);

const popupAddCard = new PopupWithForm(popUpAddCard, addCardFormSubmit);

//Экземпляр класса UserInfo:
const userInfo = new UserInfo(dataInputs);
console.log(userInfo.getUserInfo());

//Создание карточек и загрузочного контента:
const cardsList = new Section({
  itemCardsData: initialCards,
  renderer: (item) => {
      const card = new Card(item, popupImg.openPopup, '#card');
      const cardSimple = card.generateCard();
      cardsList.addItem(cardSimple);
    }
  }, '.elements__grid'
)
cardsList.renderAll();

btnEditProfile.addEventListener('click', btnEditProfileHandler);
function btnEditProfileHandler() {
  userInfo.getUserInfo();
  editProfileFormValidator.cleaningForm();
  popupEditProfile.openPopup();
}

btnAddCard.addEventListener('click', btnAddCardHandler);
function btnAddCardHandler () {
  addCardFormValidator.cleaningForm();
  popupAddCard.openPopup();
}

function editFormSubmit(event) {
  event.preventDefault();
  userInfo.setUserInfo();
  console.log(popupEditProfile._getInputValues());
  popupEditProfile.closePopup();
}

function addCardFormSubmit(event) {
  event.preventDefault();
  console.log('просто работаю')
  const addedCard = [{
    name: inputPlace.value,
    link: inputLink.value
  }];
  const cardsList = new Section({
    itemCardsData: addedCard,
    renderer: (item) => {
        const card = new Card(item, popupImg.openPopup, '#card');
        const cardSimple = card.generateCard();
        cardsList.addItem(cardSimple);
      }
    }, '.elements__grid'
  )
  cardsList.renderAll();
  popupAddCard.closePopup();
}
