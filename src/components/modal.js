export {openPopup, closePopup, handleEsc, openPopupImage}
import {imagePopup, imagePopupLink, imagePopupTitle, } from "./constant.js"

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', checkClick);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEsc);
    document.removeEventListener('mousedown', checkClick)
};

function checkClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
    closePopup(document.querySelector('.popup_opened'));
  };
};

function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    };
};

function openPopupImage(title, link) {
    imagePopupTitle.textContent = title;
    imagePopupLink.src = link;
    imagePopupLink.alt = title;
    openPopup(imagePopup);
  }
