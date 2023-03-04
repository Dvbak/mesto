const popUp = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = document.querySelector('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopup = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input-name');
let inputAbout = document.querySelector('.popup__input-about');

btnEdit.addEventListener('click', openPopUp);
btnClose.addEventListener('click', closePopUp);
formPopup.addEventListener('submit', handleFormSubmit);

function openPopUp() {
  popUp.classList.add('popup_opened');
  inputName.placeholder = profileName.textContent;
  inputAbout.placeholder = profileAbout.textContent;
  // Вывод значений в попапе через пласхолдер удлиняет код на две строки, но при этом получаем удобства в заполнении формы (не надо предварительно удалять текст из полей ввода). Да и по дизайну (на мой взгляд) всплывающее окно смотрится лучше.
  // inputName.value = profileName.textContent;
  // inputAbout.value = profileAbout.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
  inputName.value = '';
  inputAbout.value = '';
}

function handleFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  popUp.classList.remove('popup_opened');
  inputName.value = '';
  inputAbout.value = '';
}
