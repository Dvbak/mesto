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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardsGrid = document.querySelector('.elements__grid');
const cardTemplate = cardsGrid.querySelector('#card').content;
console.log(cardTemplate);

initialCards.forEach(function(item) {
let clonCardTemplate = cardTemplate.querySelector('.elements__item').cloneNode(true);
console.log(clonCardTemplate);
clonCardTemplate.querySelector('.elements__img').src = item.link;
clonCardTemplate.querySelector('.elements__img').alt = item.name;
clonCardTemplate.querySelector('.elements__title').textContent = item.name;
cardsGrid.append(clonCardTemplate);
});


