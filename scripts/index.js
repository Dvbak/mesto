import Card from './Card.js';
import FormValidator from './FormValidator.js';

function addCard(box, itemCardsData) {
  const card = new Card(itemCardsData, '#card');
  const cardSimple = card.generateCard();
  box.prepend(cardSimple);
}
initialCards.slice().reverse().forEach(function(item) {
  addCard(cardsGrid, item);
});

function closePopUpEscHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && evt.key === 'Escape') {
    closePopUp(openedPopup);
  }
}

function openPopUp(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEscHandler);
}

function closePopUp(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpEscHandler);
}

btnEditProfile.addEventListener('click', btnEditProfileHandler);
function btnEditProfileHandler() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  const editProfileFormValidator = new FormValidator(validationConfig, popUpEditProfile);
  editProfileFormValidator.enableValidation();
  editProfileFormValidator.cleaningForm();
  openPopUp(popUpEditProfile);
}

btnAddCard.addEventListener('click', btnAddCardHandler);
function btnAddCardHandler () {
  formPopupAddCard.reset();
  const addCardFormValidator = new FormValidator(validationConfig, popUpAddCard);
  addCardFormValidator.enableValidation();
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
  const addedCard = {name: inputPlace.value, link: inputLink.value};
  addCard(cardsGrid, addedCard);
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
