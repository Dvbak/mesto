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
  console.log('я работаю');
}

export {
  closePopUpEscHandler,
  openPopUp,
  closePopUp
}
