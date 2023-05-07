import {
  closePopUpEscHandler,
  openPopUp,
  closePopUp
} from './utils.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';


const editProfileFormValidator = new FormValidator(validationConfig, popUpEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, popUpAddCard);
addCardFormValidator.enableValidation();
const popupImg = new PopupWithImage(popUpImg); // Экземпляр попапа картинки
// popupImg.openImg('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', 'Drgs')
console.log(popupImg);

// function addCard(box, itemCardsData) {
//   const card = new Card(itemCardsData, '#card');
//   const cardSimple = card.generateCard();
//   box.prepend(cardSimple);
//   console.log('i work!');
// }
// initialCards.slice().reverse().forEach(function(item) {
//   addCard(cardsGrid, item);
// });

const cardsList = new Section({
  itemCardsData: initialCards,
  renderer: (item) => {
      const card = new Card(item, popupImg.openImg, '#card');
      const cardSimple = card.generateCard();
      cardsList.addItem(cardSimple);
    }
  }, '.elements__grid'
)

cardsList.renderAll();

btnEditProfile.addEventListener('click', btnEditProfileHandler);
function btnEditProfileHandler() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  editProfileFormValidator.cleaningForm();
  openPopUp(popUpEditProfile);
}

btnAddCard.addEventListener('click', btnAddCardHandler);
function btnAddCardHandler () {
  formPopupAddCard.reset();
  addCardFormValidator.cleaningForm();
  openPopUp(popUpAddCard);
}

formPopupEditProfile.addEventListener('submit', editFormSubmit);
function editFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp(popUpEditProfile);
}

formPopupAddCard.addEventListener('submit', addCardFormSubmit);
function addCardFormSubmit(event) {
  event.preventDefault();
  const addedCard = [{name: inputPlace.value, link: inputLink.value}];
  // addCard(cardsGrid, addedCard);
  const cardsList = new Section({
    itemCardsData: addedCard,
    renderer: (item) => {
        const card = new Card(item, '#card');
        const cardSimple = card.generateCard();
        cardsList.addItem(cardSimple);
      }
    }, '.elements__grid'
  )
  cardsList.renderAll();
  closePopUp(popUpAddCard);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});

popUps.forEach(function(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopUp(popup);
    }
  });
});
