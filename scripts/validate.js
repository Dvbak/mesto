const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

function showInputError(form, input, validationConfig) {
  const textInputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  textInputError.textContent = input.validationMessage;
  textInputError.classList.add(validationConfig.errorClass);
}

function hideInputError(form, input, validationConfig) {
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

//Не понимаю зачем создавать дополнительный класс для кнопки формы, когда есть в свойствах CSS замечательный псевдокласс :disabled. Определяем данный псевдокласс в уже существующем классе кнопки и добавляем, удаляем атрибут disabled в HTML-разметке. Категорически не согласен с Вашим комментарием. Я не просто, как Вы пишите: "...только добавляете/убираете атрибут disabled". Я при этом меняю класс элемента кнопки на псевдокласс :disabled, предусмотренный CSS. И в коде обхожусь по сути только одной строчкой добавления/убирания атрибута. Теперь же, мало того что создаем новый класс со всеми последствиями, мы должны еще прописывать почти точно такую же строку по классу. Почему то никому не приходит в голову создавать отдельный класс для hover в стандартной ситуации. Вообщем, стало еще не понятней. Но задание есть задание, поэтому надо следовать ему.

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

