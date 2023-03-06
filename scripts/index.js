const popUp = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = popUp.querySelector('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopup = popUp.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_name_name');
let inputAbout = document.querySelector('.popup__input_name_about');
// Пока не понял для чего вводить дополнительно модификаторы, которые предназначены только для JS. В данном случае можно просто определить массив инпутов и работать с каждым элементом в отдельности ( см. закомментированный код).
// let inputText = popUp.querySelectorAll('.popup__input');

btnEdit.addEventListener('click', openPopUp);
btnClose.addEventListener('click', closePopUp);
formPopup.addEventListener('submit', handleFormSubmit);

function openPopUp() {
  popUp.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  // inputText[0].value = profileName.textContent;
  // inputText[1].value = profileAbout.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value; //inputText[0].value
  profileAbout.textContent = inputAbout.value; //inputText[1].value
  closePopUp();
}
