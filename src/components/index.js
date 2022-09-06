import {cardPopup, profilePopup, profilePopupButtonEdit, 
        profilePopupForm, initialCards, cardPopupForm, profilePopupButtonAdd} from "./constant.js";
import {openPopup} from "./modal.js";
import {renderCard, createCard, shutdownButton} from "./card.js";
import {loadInfoPopupEdit, sendingFormProfile } from "./profileEdite.js";
import {enableValidation} from "./validate.js";
import '/src/pages/index.css';

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

profilePopupButtonEdit.addEventListener("click", function () {
  loadInfoPopupEdit();
  openPopup(profilePopup);
});

profilePopupForm.addEventListener("submit", sendingFormProfile);

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)
  shutdownButton();
});

initialCards.forEach(item => renderCard(item.name, item.link));