export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._checkClick = this._checkClick.bind(this);
  }


  open() {
    // console.log(this._popup)
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._checkClick)

  };

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._checkClick)
  };

  _handleEscClose = (evt) => {
    // console.log(this)
    if (evt.key === 'Escape') {
      // console.log(evt.key)
      this.close();
    }
  };

  _checkClick = (evt) => {
    // if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    //   this.close();
    // };
    // console.log(evt.target)
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    // this._popup.addEventListener('mousedown', (evt) => {
    //   this._checkClick()
    // });
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close())

  }
}


// export {openPopup, closePopup, handleEsc, openPopupImage}
// import {imagePopup, imagePopupLink, imagePopupTitle, } from "./constant.js"

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', handleEsc);
//     document.addEventListener('mousedown', checkClick);
// };

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleEsc);
//     document.removeEventListener('mousedown', checkClick)
// };

// function checkClick(evt) {
//   if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
//     closePopup(document.querySelector('.popup_opened'));
//   };
// };

// function handleEsc(evt) {
//     if (evt.key === 'Escape') {
//       closePopup(document.querySelector('.popup_opened'));
//     };
// };

// function openPopupImage(title, link) {
//     imagePopupTitle.textContent = title;
//     imagePopupLink.src = link;
//     imagePopupLink.alt = title;
//     openPopup(imagePopup);
//   }
