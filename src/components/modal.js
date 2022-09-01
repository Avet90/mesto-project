export {openPopup, closePopup, keyEsc, openPopupImage}
import {cardForm, popupMain, cardPopup, imagePopup} from "./constant.js"

function openPopup(popup) {
    popup.classList.add('popup_opened');
  };

function closePopup(popup) {
    popup.classList.remove('popup_opened');
  };

function keyEsc(evt) {
    if (evt.key === 'Escape') {
      cardForm.reset();
      popupMain.classList.remove('popup_opened');
      cardPopup.classList.remove('popup_opened');
      imagePopup.classList.remove('popup_opened');
    }
  };

function openPopupImage(title, link) {
    const imagePopup = document.querySelector('.popup-img')
    const imagePopupButtonClose = document.querySelector('.popup-img__close-img')
    const imagePopupTitle = imagePopup.querySelector(".popup-img__title");
    const imagePopupLink = imagePopup.querySelector(".popup-img__image");
    imagePopupTitle.textContent = title;
    imagePopupLink.src = link;
    imagePopupLink.alt = title;
    openPopup(imagePopup);
  }