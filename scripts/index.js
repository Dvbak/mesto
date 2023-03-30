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

function closePopUpEscHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && evt.key === 'Escape') {
    closePopUp(openedPopup);
  }
}

function openPopUp(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEscHandler);
  // closeClick(modal);
}

function closePopUp(modal) {
  modal.classList.remove('popup_opened');
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
// Вариант 1 - есть минус в том что постоянно на документе висит обработчик события, зато он один. Возможный минус, если следовать досканально "сухому" правилу DRY, это повторение определения переменной openedPopup. По-моему лучше так в обработчике событий (это будет реже), чем просто определять в локальной области функции открытия модального окна (что чаще).

document.body.addEventListener('click', function(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && evt.target === openedPopup) {
    closePopUp(openedPopup);
  }
});

//Вариант 2 - минус в том, что если закрываем модалку не по клику, то происходит накопление обработчиков событий. Это длится до тех пор пока не кликнем "как надо". Из двух вариантов нравится больше первый, потому что покороче.

// function closeClick(modal) {
//   function closeClickHandler(evt) {
//     if (evt.target === evt.currentTarget) {
//       closePopUp(modal);
//       modal.removeEventListener('click', closeClickHandler);
//     }
//   }
//   modal.addEventListener('click', closeClickHandler);
// }



// const popup = document.querySelectorAll('.popup');
// console.log(popup);
// function closeClick() {
//   popup.forEach(function(win) {
//     if (win.classList.contains('popup_opened')) {
//       win.addEventListener('click', function(evt) {
//         if (evt.target === evt.currentTarget) {
//           closePopUp(win);
//         }
//       }, {once: true});
//     }
//   });
// }
