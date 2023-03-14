const popUp = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = popUp.querySelector('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopup = popUp.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_name_name');
let inputAbout = document.querySelector('.popup__input_name_about');


btnEdit.addEventListener('click', openPopUp);
btnClose.addEventListener('click', closePopUp);
formPopup.addEventListener('submit', handleFormSubmit);

function openPopUp() {
  popUp.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp();
}
