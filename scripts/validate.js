const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputHintClass: 'popup__input-hint_attached'
};

function toggleInputHint(form, input) {
  const inputHint = form.querySelector(`.${input.id}-hint`);
  if (input.value !== '') {
    inputHint.classList.add(validationConfig.inputHintClass);
  } else inputHint.classList.remove(validationConfig.inputHintClass);
}

function showInputError(form, input) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  textInputError.textContent = input.validationMessage;
  textInputError.classList.add(validationConfig.errorClass);
}

function hideInputError(form, input) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  textInputError.classList.remove(validationConfig.errorClass);
  textInputError.textContent = '';
}

function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

function hasInvalidInput(list) {
  return list.some(function(input) {
    return !input.validity.valid;
  });
}

function enableSubmitButton(button) {
  button.classList.remove(validationConfig.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function disableSubmitButton(button) {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function toggleSubmitButton(button, list) {
  if (hasInvalidInput(list)) {
    disableSubmitButton(button, validationConfig);
  } else {
    enableSubmitButton(button, validationConfig);
  }
}

function setEventListeners(form) {
  const inputsList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  console.log(inputsList);
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);
  inputsList.forEach(function(input) {
    input.addEventListener('input', function() {
      isValid(form, input);
      toggleInputHint(form, input);
      toggleSubmitButton(buttonSubmit, inputsList, validationConfig);
    });
  });
}

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  console.log(validationConfig);
  console.log(formsList);
  formsList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig);

