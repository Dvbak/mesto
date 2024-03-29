/* Данный класс настравает валидацию полей формы. Принимает в конструктор объект настроек с селекторами и классами (options) и ссылку на проверяемую форму (modal). Имеет приватные (защищенные) методы для проверки валидности полей (_isValid(input)), изменения состояния кнопки сабмита (_toggleSubmitButton(inputsList)), появления/скрытия всплыващих пласхолдеров (_toggleInputHint(input)), установки обработчиков инпут событий (_setEventListeners()).
Реализовано два публичных метода:
enableValidation(), включающий валидацию формы;
resetValidation(), предназначенный для чистки форм в случае закрытия без сохранения данных.
Класс FormValidator импортируется в файл index.js. Экземпляры класса создаются при отработке кликов на соответствующих кнопках инициализации модальных окон в файле index.js. */

class FormValidator {
  constructor(options, formModal) {
    this._formModal = formModal;
    // this._formModal = modal.querySelector(options.formSelector);
    /* Действительно, если рассматривать с точки зрения чистоты класса, то попапы здесь не нужны. Тогда не понятно зачем в validationConfig есть поле formSelector, этот параметр используется только в первой строке данного класса. И что лучше - одна строка кода в данном классе или три строки в constante.js*/
    this._input = options.inputSelector;
    this._inputError = options.inputErrorClass;
    this._error = options.errorClass;
    this._submitButton = this._formModal.querySelector(options.submitButtonSelector);
    this._inactiveButton = options.inactiveButtonClass;
    this._inputHint = options.inputHintClass;
    this._inputsList = formModal.querySelectorAll(options.inputSelector);
  }

  _showInputError(input) {
    input.classList.add(this._inputError);
    const textInputError = this._formModal.querySelector(`.${input.id}-error`);
    textInputError.textContent = input.validationMessage;
    console.log(textInputError);
    textInputError.classList.add(this._error);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputError);
    const textInputError = this._formModal.querySelector(`.${input.id}-error`);
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
    this._submitButton.classList.remove(this._inactiveButton);
    this._submitButton.removeAttribute('disabled');
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButton);
    this._submitButton.setAttribute('disabled', true);
  }

  _hasInvalidInput() {
    return Array.from(this._inputsList).some(function(input) {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _toggleInputHint(input) {
    if (input.value !== '') {
      this._formModal.querySelector(`.${input.id}-hint`).classList.add(this._inputHint);
    } else this._formModal.querySelector(`.${input.id}-hint`).classList.remove(this._inputHint);
  }

  _handlerInput(item) {
    this._isValid(item);
    this._toggleInputHint(item);
  }

  _setEventListeners() {
    this._inputsList.forEach((item) => {
      item.addEventListener('input', () => {
        this._handlerInput(item);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formModal.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputsList.forEach((input) => {
      this._hideInputError(input);
      this._toggleInputHint(input);
    });
    if (!this._submitButton.classList.contains(this._inactiveButton)) {
      this._disableSubmitButton();
    }
  }
}

export default FormValidator;
