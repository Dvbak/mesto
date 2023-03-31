function showInputError(form, input) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  textInputError.textContent = input.validationMessage;
  textInputError.classList.add('popup__input-error_visible');
}

function hideInputError(form, input) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  textInputError.classList.remove('popup__input-error_visible');
  textInputError.textContent = '';
}

function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function setEventListeners(form) {
  const inputsList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonSubmit = form.querySelector('.popup__submit');
  toggleSubmitButton(buttonSubmit, inputsList);
  inputsList.forEach(function(input) {
    input.addEventListener('input', function() {
      isValid(form, input);
      toggleSubmitButton(buttonSubmit, inputsList);
    });
  });
}

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll('.popup__form'));
  formsList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

function hasInvalidInput(list) {
  return list.some(function(input) {
    return !input.validity.valid;
  });
}

//Не понимаю зачем создавать дополнительный класс для кнопки формы, когда есть в свойствах CSS псевдокласс :disabled. Определяем данный псевдокласс в уже существующем классе кнопки и добавляем, удаляем атрибут disabled в HTML-разметке:

function toggleSubmitButton(button, list) {
  if (hasInvalidInput(list)) {
    button.setAttribute('disabled', true);
  } else {
    button.removeAttribute('disabled');
  }
}

enableValidation();

