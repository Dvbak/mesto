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

function creatCard(name, link) {
  let clonTemplateCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  clonTemplateCard.querySelector('.elements__img').src = link;
  clonTemplateCard.querySelector('.elements__img').alt = name;
  clonTemplateCard.querySelector('.elements__title').textContent = name;

  let btnAddLike = clonTemplateCard.querySelector('.elements__btn');
  btnAddLike.addEventListener('click', function() {
    btnAddLike.classList.toggle('elements__btn_like');
  });
  let btnCardDelet = clonTemplateCard.querySelector('.elements__btn-delet');
  btnCardDelet.addEventListener('click', function() {
    btnCardDelet.closest('.elements__item').remove();
  });
  let btnOpenImg = clonTemplateCard.querySelector('.elements__img');
  btnOpenImg.addEventListener('click', function() {
    popUpImg.querySelector('.popup__image').src = link;
    popUpImg.querySelector('.popup__caption').textContent = name;
    openPopUp(popUpImg);
  });
  cardsGrid.prepend(clonTemplateCard);
}

initialCards.slice().reverse().forEach(function(item) {
creatCard(item.name, item.link);
}); // Запускаю обратный массив, т.к. по заданию карточки надо вставлять в начало списка (prepend), а порядок следования в массиве не соответсвует описанию в задании. Можно сделать и через обратный цикл(см. ниже).

// for (let i = initialCards.length - 1; i >= 0; i--) {
//   creatCard(initialCards[i].name, initialCards[i].link);
// }


const popUpEdit = document.querySelector('.popup_edit');
const btnEdit = document.querySelector('.profile__btn-edit');
const popUpAdd = document.querySelector('.popup_add');
const btnAdd = document.querySelector('.profile__btn-add');
const popUpImg = document.querySelector('.popup_img');
const buttonsClose = document.querySelectorAll('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopupEdit = popUpEdit.querySelector('.popup__form');
let inputName = popUpEdit.querySelector('.popup__input_name_name');
let inputAbout = popUpEdit.querySelector('.popup__input_name_about');
let formPopupAdd = popUpAdd.querySelector('.popup__form');
let inputPlace = popUpAdd.querySelector('.popup__input_name_place');
let inputLink = popUpAdd.querySelector('.popup__input_name_link');

function openPopUp(modal) {
  modal.classList.add('popup_opened');
}
function closePopUp(modal) {
  modal.classList.remove('popup_opened');
}
btnEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopUp(popUpEdit);
});
btnAdd.addEventListener('click', function() {
  openPopUp(popUpAdd);
});

formPopupEdit.addEventListener('submit', editFormSubmit);

function editFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp(popUpEdit);
}

formPopupAdd.addEventListener('submit', creatCardFormSubmit);

function creatCardFormSubmit(event) {
  event.preventDefault();
  creatCard(inputPlace.value, inputLink.value);
  inputPlace.value = '';
  inputLink.value = '';
  closePopUp(popUpAdd);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});




