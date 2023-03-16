const popUpEdit = document.querySelector('.popup_edit');
const btnEdit = document.querySelector('.profile__btn-edit');
const popUpAdd = document.querySelector('.popup_add');
const btnAdd = document.querySelector('.profile__btn-add');
const buttonsClose = document.querySelectorAll('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopup = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_name_name');
let inputAbout = document.querySelector('.popup__input_name_about');

btnEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopUp(popUpEdit)});
btnAdd.addEventListener('click', () => openPopUp(popUpAdd));
formPopup.addEventListener('submit', handleFormSubmit);

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});

function openPopUp(modal) {
  modal.classList.add('popup_opened');
}

function closePopUp(modal) {
  modal.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp(popUpEdit);
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

const buttonsLike = document.querySelectorAll('.elements__btn');
console.log(buttonsLike);

buttonsLike.forEach(function(item) {
  item.addEventListener('click', () =>
    item.classList.toggle('elements__btn_like') //в  данном случае более занимательно, нежели просто add
  );
});

const buttonsDelet = document.querySelectorAll('.elements__btn-delet');
console.log(buttonsDelet);

buttonsDelet.forEach(function(item) {
  item.addEventListener('click', function() {
    const elementsItem = item.closest('.elements__item');
    elementsItem.remove();
  });
});
