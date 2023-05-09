import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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
