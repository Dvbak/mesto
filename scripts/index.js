function createCard(name, link) {
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
  addCard(cardsGrid, createCard(item.name, item.link));
}); // Запускаю обратный массив, т.к. по заданию карточки надо вставлять в начало списка (prepend), а порядок следования в массиве не соответсвует описанию в задании. Можно сделать и через обратный цикл(см. ниже).
// for (let i = initialCards.length - 1; i >= 0; i--) {
//   creatCard(initialCards[i].name, initialCards[i].link);
// }

function openPopUp(modal) {
  modal.classList.add('popup_opened');
}
function closePopUp(modal) {
  modal.classList.remove('popup_opened');
}
btnEditProfile.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopUp(popUpEditProfile);
});
btnAddCard.addEventListener('click', function() {
  formPopupAddCard.reset();
  // inputPlace.value = '';
  // inputLink.value = '';
  openPopUp(popUpAddCard);
});

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
  // creatCard(inputPlace.value, inputLink.value);
  addCard(cardsGrid, createCard(inputPlace.value, inputLink.value));
  closePopUp(popUpAddCard);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});




