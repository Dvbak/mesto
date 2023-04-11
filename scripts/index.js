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
  return clonTemplateCard;
}

function addCard(box, clon) {
  box.prepend(clon);
}

initialCards.slice().reverse().forEach(function(item) {
  addCard(cardsGrid, createCard(item.name, item.link));
});

//Создаю функцию обработчик события нажатия на клавишу Esc. Согласно заданию буду подключать при открытии модального окна, и удалять при закрытии:

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

//Данная функция переключает вид подсказки в инпутах в зависимости от его заполнения:

function cancelInputHint(modal) {
  const inputsHint = modal.querySelectorAll('.popup__input');
  inputsHint.forEach(function(input) {
    toggleInputHint(modal, input);
  });
}

//Нижеследующая функция делает недоступной кнопку отправки submit в форме модальных окон:

function cancelSubmitButton(modal) {
  const submitButton = modal.querySelector('.popup__submit');
  if (!submitButton.classList.contains('popup__submit_disabled')) {
    disableSubmitButton(submitButton);
  };
}

//Следующая функция очищает форму модального окна от текста ошибок в случае закрытия без сохранения данных:

function deletTextError (modal) {
  const inputsInvalid = modal.querySelectorAll('.popup__input');
  inputsInvalid.forEach(function(input) {
    hideInputError(modal, input);
  });
}

btnEditProfile.addEventListener('click', btnEditProfileHandler);
function btnEditProfileHandler() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  cancelInputHint(popUpEditProfile);
  deletTextError(popUpEditProfile);
  cancelSubmitButton(popUpEditProfile);
  openPopUp(popUpEditProfile);
}

btnAddCard.addEventListener('click', btnAddCardHandler);
function btnAddCardHandler () {
  formPopupAddCard.reset();
  cancelInputHint(popUpAddCard);
  deletTextError(popUpAddCard);
  cancelSubmitButton(popUpAddCard);
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
  addCard(cardsGrid, createCard(inputPlace.value, inputLink.value));
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

// const inputsHint = document.querySelectorAll('.popup__input-hint');
// console.log(inputsHint);
// inputsHint.forEach(function(hint) {
//   hint.classList.add('popup__input-hint_attached');
// })

//Вариант 2 - плюс в том что обработчик события появляется и удаляется при открытии и закрытии окна. Минус в том, что если закрываем модалку не по клику, то происходит накопление обработчиков событий. Это длится до тех пор пока не кликнем "как надо".:

// function closeClick(modal) {
//   function closeClickHandler(evt) {
//     if (evt.target === evt.currentTarget) {
//       closePopUp(modal);
//       modal.removeEventListener('click', closeClickHandler);
//     }
//   }
//   modal.addEventListener('click', closeClickHandler);
// }

