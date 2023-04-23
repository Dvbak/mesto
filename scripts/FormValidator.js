/* Данный класс настравает валидацию полей формы. Принимает в конструктор объект настроек с селекторами и классами (options) и ссылку на проверяемую форму (modal). Имеет приватные (защищенные) методы для проверки валидности полей (_isValid(input)), изменения состояния кнопки сабмита (_toggleSubmitButton(inputsList)), появления/скрытия всплыващих пласхолдеров (_toggleInputHint(input)), установки обработчиков инпут событий (_setEventListeners()).
Реализовано два публичных метода:
enableValidation(), включающий валидацию формы;
cleaningForm(), предназначенный для чистки форм в случае закрытия без сохранения данных.
Класс FormValidator импортируется в файл index.js. Экземпляры класса создаются при отработке кликов на соответствующих кнопках инициализации модальных окон в файле index.js. */

class FormValidator {
  constructor(options, modal) {
    this._formSelector = modal.querySelector(options.formSelector);
    this._input = options.inputSelector;
    this._inputError = options.inputErrorClass;
    this._error = options.errorClass;
    this._submitButton = options.submitButtonSelector;
    this._inactiveButton = options.inactiveButtonClass;
    this._inputHint = options.inputHintClass;
  }

  _showInputError(input) {
    input.classList.add(this._inputError);
    const textInputError = this._formSelector.querySelector(`.${input.id}-error`);
    textInputError.textContent = input.validationMessage;
    console.log(input.validationMessage);
    textInputError.classList.add(this._error);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputError);
    const textInputError = this._formSelector.querySelector(`.${input.id}-error`);
    textInputError.textContent = '';
    textInputError.classList.remove(this._error);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _enableSubmitButton() {
    this._formSelector.querySelector(this._submitButton).classList.remove(this._inactiveButton);
    this._formSelector.querySelector(this._submitButton).removeAttribute('disabled');
  }

  _disableSubmitButton() {
    this._formSelector.querySelector(this._submitButton).classList.add(this._inactiveButton);
    this._formSelector.querySelector(this._submitButton).setAttribute('disabled', true);
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some(function(input) {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton(inputsList) {
    if (this._hasInvalidInput(inputsList)) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _toggleInputHint(input) {
    console.log(input.value);
    if (input.value !== '') {
      this._formSelector.querySelector(`.${input.id}-hint`).classList.add(this._inputHint);
    } else this._formSelector.querySelector(`.${input.id}-hint`).classList.remove(this._inputHint);
  }

  _handlerInput(item) {
    this._isValid(item);
    this._toggleInputHint(item);
  }

  _setEventListeners() {
    Array.from(this._formSelector.querySelectorAll(this._input)).forEach((item) => {
      item.addEventListener('input', () => {
        this._handlerInput(item);
        this._toggleSubmitButton(Array.from(this._formSelector.querySelectorAll(this._input)));
      });
    });
  }

  enableValidation() {
    console.log(this._formSelector);
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  cleaningForm() {
    this._formSelector.querySelectorAll(this._input).forEach((input) => {
      this._hideInputError(input);
      this._toggleInputHint(input);
    });
    if (!this._formSelector.querySelector(this._submitButton).classList.contains(this._inactiveButton)) {
      this._disableSubmitButton();
    }
  }
}

export default FormValidator;
