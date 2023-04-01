const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}; // Константу не стал переносить в файл constant.js. В случае изменения классов и прочих входных данных для валидации форм, на мой взгляд, это удобнее делать в данном файле.

function showInputError(form, input, validationConfig) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  textInputError.textContent = input.validationMessage;
  textInputError.classList.add(validationConfig.errorClass);
}

function hideInputError(form, input, validationConfig) {
  // console.log(validationConfig.inputErrorClass);
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

//Не понимаю зачем создавать дополнительный класс для кнопки формы, когда есть в свойствах CSS замечательный псевдокласс :disabled. Определяем данный псевдокласс в уже существующем классе кнопки и добавляем, удаляем атрибут disabled в HTML-разметке:

function toggleSubmitButton(button, list, validationConfig) {
  if (hasInvalidInput(list)) {
    button.setAttribute(validationConfig.inactiveButtonAttribute, true);
  } else {
    button.removeAttribute(validationConfig.inactiveButtonAttribute);
  }
}

function setEventListeners(form, validationConfig) {
  const inputsList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);
  inputsList.forEach(function(input) {
    input.addEventListener('input', function() {
      isValid(form, input);
      toggleSubmitButton(buttonSubmit, inputsList, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // console.log(validationConfig.formSelector);
  formsList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig);

