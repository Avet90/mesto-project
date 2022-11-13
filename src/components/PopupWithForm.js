import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerSubmitForm) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._popup.querySelector('.form');
        // this._submitButton = this._popup.querySelector('.popup__button');
        // this._submitInitialButtonValue = this._submitButton.textContent;
        // this._inputList = this._popup.querySelectorAll('.form__input');
    }


    _getInputValues() {
        const inputValue = {};
        this._inputList.forEach((inputField) => {
            inputValue[inputField.name] = inputField.value;
        });
        return inputValue;
    }

    setEventListeners() {
        super.setEventListeners();
        // this._form.addEventListener('submit', () => {
        //     this._submitForm(this._getInputValues());
        //     this.close();
        // });
    }
    close() {
        super.close();
        this._form.reset();
    }

    test() {
        console.log(this)
    }

} 