export default class FormValidator {
  constructor(config, formElement){
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this.showInputError(inputElement);
    };
  };

  _hasInvalidInput () {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.disabled = true;
    } else {
      this._buttonElement.classList.disabled = false;   
    };
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        })
    })
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  clearForm(ifButtonElementEnabled) {
    if (ifButtonElementEnabled === undefined) {
        ifButtonElementEnabled = false;
    }
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    })
    this._buttonElement.disabled = !ifButtonElementEnabled;
  } 

}


// const showInputError = (formElement, inputElement, errorMessage, selectorsConfig) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(selectorsConfig.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(selectorsConfig.errorClass);
// };

// const hideInputError = (formElement, inputElement, selectorsConfig) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(selectorsConfig.inputErrorClass);
//     errorElement.classList.remove(selectorsConfig.errorClass);
//     errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, selectorsConfig) => {
//     if (inputElement.validity.patternMismatch) {
//       inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//       inputElement.setCustomValidity("");
//     };
//     if(!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage, selectorsConfig);
//     } else {
//       hideInputError(formElement, inputElement, selectorsConfig);
//     };
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
// };

// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(inactiveButtonClass);
//       buttonElement.setAttribute('disabled', true);

//     } else {
//       buttonElement.classList.remove(inactiveButtonClass);
//       buttonElement.removeAttribute('disabled', true);
//     };
// };

// const setEventListeners = (formElement, selectorsConfig) => {
//     const inputList = Array.from(formElement.querySelectorAll(selectorsConfig.inputSelector));
//     const buttonElement = formElement.querySelector(selectorsConfig.submitButtonSelector);
//     formElement.addEventListener('reset', () => {
//       setTimeout(() => {
//         toggleButtonState(inputList, buttonElement, selectorsConfig.inactiveButtonClass); 
//       }, 0);
//     });
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function (){
//         toggleButtonState (inputList, buttonElement, selectorsConfig.inactiveButtonClass);
//         checkInputValidity(formElement, inputElement, selectorsConfig);
//       });
//     });
// };

// const enableValidation = (selectorsConfig) => {
//     const formList = Array.from(document.querySelectorAll(selectorsConfig.formSelector));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       });
//       setEventListeners(formElement, selectorsConfig);
//     });
// };

// export{showInputError, hideInputError, checkInputValidity, hasInvalidInput, 
//     toggleButtonState, setEventListeners, enableValidation}