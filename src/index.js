import {imagePopup, cardForm, cardPopup, popupMain, profilePopup, profilePopupButtonEdit, 
        profilePopupForm, initialCards, cardPopupForm, profilePopupButtonAdd, pageMain} from "./components/constant.js";
import {openPopup, keyEsc} from "./components/modal.js";
import {renderCard, createCard, loadInfoPopupEdit, sendingFormProfile} from "./components/card.js";
import {enableValidation} from "./components/validate.js";
import './pages/index.css';

enableValidation();

profilePopupButtonEdit.addEventListener("click", function () {
  loadInfoPopupEdit();
  openPopup(profilePopup);
});

profilePopupForm.addEventListener("submit", sendingFormProfile);

pageMain.addEventListener('keydown', keyEsc);

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)});

initialCards.forEach(item => renderCard(item.name, item.link));

// Слушатель на закрытия popup
pageMain.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
    cardForm.reset();
    popupMain.classList.remove('popup_opened');
    cardPopup.classList.remove('popup_opened');
    imagePopup.classList.remove('popup_opened');
  }
});



