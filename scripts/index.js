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
    if (hasFormsInPopup(openedPopup)){
      closePopUp(openedPopup);
      deletTextError(openedPopup);
    }
    closePopUp(openedPopup);
  }
}

//Нижеследующая функция делает недоступной кнопку отправки submit в форме модальных окон:

function cancelSubmitButton(modal) {
    const submitButton = modal.querySelector('.popup__submit');
    if (!submitButton.classList.contains('popup__submit_disabled')) {
      disableSubmitButton(submitButton);
    };
}

function openPopUp(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEscHandler);
}

//Следующая функция очищает форму модального окна от текста ошибок в случае закрытия без сохранения данных:

function deletTextError (modal) {
  const inputsInvalid = modal.querySelectorAll('.popup__input');
  // if (inputsInvalid.length !== 0) {
    inputsInvalid.forEach(function(input) {
      hideInputError(modal, input, validationConfig);
    });
  // }
}

function closePopUp(modal) {
  modal.classList.remove('popup_opened');
  // deletTextError(modal);
  document.removeEventListener('keydown', closePopUpEscHandler);
}

btnEditProfile.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  cancelSubmitButton(popUpEditProfile);
  openPopUp(popUpEditProfile);
});

btnAddCard.addEventListener('click', function() {
  formPopupAddCard.reset();
  cancelSubmitButton(popUpAddCard);
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

//Создаю функцию наличия формы в модалке. С её помощью проверяю закрывающиеся окна на наличие форм. При обнаружении таковой к функции закрытия окна добавляю функцию зачистки формы. Хотя, я бы оставил бы функцию очистки в общей функции закрытия, добавив всего пару строк кода проверки наличия формы. Таким образом зачистка не происходила бы при отсутсвии инпутов. С точки зрения оптимизации кода этот вариант лучше - всего три строки кода дополнительно (мною закомментированы). В другом случае это три строчки функции проверки и по три строчки в каждую функцию закрытия:

function hasFormsInPopup(modal) {
  const hasInputs = modal.querySelectorAll('.popup__input');
  return (hasInputs.length !== 0);
}

buttonsClose.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const popup = btn.closest('.popup');
    if (hasFormsInPopup(popup)){
      closePopUp(popup);
      deletTextError(popup);
    }
    closePopUp(popup);
  });
});

//Вариант 3 - предложенный Вами, если я конечно правильно понял Ваш комментарий. Не понял чем он лучше моего первого. Теперь вместо одного висят три обработчика. Да не на document, на оверлее, но три и постоянно. Хотелось бы понять чем этот вариант лучше моего второго?:

console.log(popUps);
popUps.forEach(function(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      if (hasFormsInPopup(popup)){
        closePopUp(popup);
        deletTextError(popup);
      }
      closePopUp(popup);
    }
  });
});


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


