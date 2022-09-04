export {openPopup, closePopup, handleEsc, openPopupImage}
import {cardForm, popupMain, cardPopup, imagePopup, pageMain, imagePopupLink} from "./constant.js"

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
  };

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEsc);
  };

function handleEsc(evt) {
    if (evt.key === 'Escape') {
      cardForm.reset();
      closePopup(document.querySelector('.popup_opened'));
    }
  };

function openPopupImage(title, link) {
    const imagePopupButtonClose = document.querySelector('.popup-img__close-img')
    const imagePopupTitle = imagePopup.querySelector(".popup-img__title");
    imagePopupTitle.textContent = title;
    imagePopupLink.src = link;
    imagePopupLink.alt = title;
    openPopup(imagePopup);
  }
