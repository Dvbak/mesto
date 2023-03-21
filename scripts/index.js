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
const popUpImg = document.querySelector('.popup_img');
const imagePopUpImg = popUpImg.querySelector('.popup__image');
const captionPopUpImg = popUpImg.querySelector('.popup__caption');

function creatCard(name, link) {
  const clonTemplateCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const imgElementsItem = clonTemplateCard.querySelector('.elements__img');
  const titleElementsItem = clonTemplateCard.querySelector('.elements__title');
  imgElementsItem.src = link;
  imgElementsItem.alt = name;
  titleElementsItem.textContent = name;

  const btnAddLike = clonTemplateCard.querySelector('.elements__btn');
  btnAddLike.addEventListener('click', function() {
    btnAddLike.classList.toggle('elements__btn_like');
  });
  const btnDeletCard = clonTemplateCard.querySelector('.elements__btn-delet');
  btnDeletCard.addEventListener('click', function() {
    btnDeletCard.closest('.elements__item').remove();
  });
  const btnOpenImg = clonTemplateCard.querySelector('.elements__img');
  btnOpenImg.addEventListener('click', function() {
    imagePopUpImg.src = link;
    imagePopUpImg.alt = name;
    captionPopUpImg.textContent = name;
    openPopUp(popUpImg);
  });
  // cardsGrid.prepend(clonTemplateCard);
  return clonTemplateCard;
}

function addCard(box, clon) {
  box.prepend(clon);
} // Не совсем понятен смысл создания отдельной функции вместо однострочной инструкции, тем более когда в ней используются локальные переменные? К тому же это привело к небольшому, но увеличению кода. По моему мнению изначальная функция creatCard выполняет одно действие - это динамическое создание отдельного элемента (<li class="elements__item">) контента и отделять процесс добавления карточки в DOM не совсем правильно. Если следовать подобной логике, то функционал создания клона тоже можно рассмотреть как отдельное действие.

initialCards.slice().reverse().forEach(function(item) {
  // creatCard(item.name, item.link);
  addCard(cardsGrid, creatCard(item.name, item.link));
}); // Запускаю обратный массив, т.к. по заданию карточки надо вставлять в начало списка (prepend), а порядок следования в массиве не соответсвует описанию в задании. Можно сделать и через обратный цикл(см. ниже).
// for (let i = initialCards.length - 1; i >= 0; i--) {
//   creatCard(initialCards[i].name, initialCards[i].link);
// }


const popUpEditProfile = document.querySelector('.popup_edit');
const btnEdit = document.querySelector('.profile__btn-edit');
const popUpAddCard = document.querySelector('.popup_add');
const btnAdd = document.querySelector('.profile__btn-add');
const buttonsClose = document.querySelectorAll('.popup__closed');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let formPopupEditProfile = popUpEditProfile.querySelector('.popup__form');
let inputName = popUpEditProfile.querySelector('.popup__input_name_name');
let inputAbout = popUpEditProfile.querySelector('.popup__input_name_about');
let formPopupAddCard = popUpAddCard.querySelector('.popup__form');
let inputPlace = popUpAddCard.querySelector('.popup__input_name_place');
let inputLink = popUpAddCard.querySelector('.popup__input_name_link');

function openPopUp(modal) {
  modal.classList.add('popup_opened');
}
function closePopUp(modal) {
  modal.classList.remove('popup_opened');
}
btnEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopUp(popUpEditProfile);
});
btnAdd.addEventListener('click', function() {
  inputPlace.value = '';
  inputLink.value = '';
  openPopUp(popUpAddCard);
});

formPopupEditProfile.addEventListener('submit', editFormSubmit);

function editFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp(popUpEditProfile);
}

formPopupAddCard.addEventListener('submit', creatCardFormSubmit);

function creatCardFormSubmit(event) {
  event.preventDefault();
  // creatCard(inputPlace.value, inputLink.value);
  addCard(cardsGrid, creatCard(inputPlace.value, inputLink.value));
  closePopUp(popUpAddCard);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});




