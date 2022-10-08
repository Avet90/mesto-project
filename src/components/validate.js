
const showInputError = (formElement, inputElement, errorMessage, selectorsConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorsConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorsConfig.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorsConfig.inputErrorClass);
    errorElement.classList.remove(selectorsConfig.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    };
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, selectorsConfig);
    } else {
      hideInputError(formElement, inputElement, selectorsConfig);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);

    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    };
};

const setEventListeners = (formElement, selectorsConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(selectorsConfig.inputSelector));
    const buttonElement = formElement.querySelector(selectorsConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorsConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (){
        toggleButtonState (inputList, buttonElement, selectorsConfig.inactiveButtonClass);
        checkInputValidity(formElement, inputElement, selectorsConfig);
      });
    });
};

const enableValidation = (selectorsConfig) => {
    const formList = Array.from(document.querySelectorAll(selectorsConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, selectorsConfig);
    });
};

export{showInputError, hideInputError, checkInputValidity, hasInvalidInput, 
    toggleButtonState, setEventListeners, enableValidation}