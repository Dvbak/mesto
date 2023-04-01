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

//Нижеследующая функция делает недоступной кнопку отправки submit в форме модальных окон:

function cancelSubmitButton(modal) {
  if (!modal.classList.contains('popup_img')) {
    const submitButton = modal.querySelector('.popup__submit');
    if (!submitButton.hasAttribute('disabled')) {
      submitButton.setAttribute('disabled', true);
    };
  }
}

function openPopUp(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEscHandler);
  cancelSubmitButton(modal);
  // closeClick(modal);
}

//Следующая функция очищает форму модального окна от текста ошибок в случае закрытия без сохранения данных:

function deletTextError (modal) {
  const inputsInvalid = modal.querySelectorAll('.popup__input');
  const textsInvalid = modal.querySelectorAll('.popup__input-error');
  inputsInvalid.forEach(function(input) {
    input.classList.remove('popup__input_type_error');
  })
  textsInvalid.forEach(function(text) {
    text.classList.remove('popup__input-error_visible');
  })
}

function closePopUp(modal) {
  modal.classList.remove('popup_opened');
  deletTextError(modal);
  document.removeEventListener('keydown', closePopUpEscHandler);
}

btnEditProfile.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopUp(popUpEditProfile);
});

btnAddCard.addEventListener('click', function() {
  formPopupAddCard.reset();
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
  addCard(cardsGrid, createCard(inputPlace.value, inputLink.value));
  closePopUp(popUpAddCard);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    closePopUp(popup);
  });
});

// Два варианта отработки закрытия при клике по оверлею:
// Вариант 1 - есть минус в том что постоянно на документе висит обработчик события и следит за самым частым событием - кликом, но зато он один. Возможный минус, если следовать досканально "сухому" правилу DRY, это повторение определения переменной openedPopup.

document.body.addEventListener('click', function(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  // console.log(openedPopup);
  if (openedPopup && evt.target === openedPopup) {
    closePopUp(openedPopup);
  }
});

//Вариант 2 - плюс в том что обработчик события появляется и удаляется при открытии и закрытии окна. Минус в том, что если закрываем модалку не по клику, то происходит накопление обработчиков событий. Это длится до тех пор пока не кликнем "как надо". Из двух вариантов выбрал первый, потому что покороче:

// function closeClick(modal) {
//   function closeClickHandler(evt) {
//     if (evt.target === evt.currentTarget) {
//       closePopUp(modal);
//       modal.removeEventListener('click', closeClickHandler);
//     }
//   }
//   modal.addEventListener('click', closeClickHandler);
// }
