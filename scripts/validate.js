// formPopupEditProfile;
// inputName;
// inputAbout;
// btnEditProfile;
const textInputError = document.querySelector(`.${inputName.id}-error`);

console.log(inputName.id);
console.log(inputName.validationMessage);


function showInputError(input, errorMessage) {
  input.classList.add('popup__input_type_error');
  textInputError.textContent = errorMessage;
  textInputError.classList.add('popup__input-error_visible');
}

function hideInputError(input) {
  input.classList.remove('popup__input_type_error');
  textInputError.classList.remove('popup__input-error_visible');
  textInputError.textContent = '';
}

function isValid() {
  if (!inputName.validity.valid) {
    showInputError(inputName, inputName.validationMessage);
  } else {
    hideInputError(inputName);
  }
}
inputName.addEventListener('input', isValid);
