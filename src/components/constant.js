const cardForm = document.forms.element__form;
const imagePopup = document.querySelector('.popup-img')
const popupMain = document.querySelector('.popup');
const cardPopup = document.querySelector('.mesto')
const elementTemplate = document.querySelector('#element-template').content;
const profilePopupInputName = document.querySelector('.popup__input_name');
const profilePopupInputInfo = document.querySelector('.popup__input_info');
const profilePopupAbout = document.querySelector('.profile__subtitle');
const profilePopupForm = document.querySelector('.popup__form');
const profilePopupButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup-edit');
const profilePopupName = document.querySelector('.profile__title');
const cardPopupForm = document.querySelector('.mesto__form')
const profilePopupButtonAdd = document.querySelector('.profile__add-button');
const pageMain = document.querySelector('.page');
const cardPopupContainer = document.querySelector('.elements')
const cardPopupNewName = document.querySelector('.mesto__input_first');
const cardPopupNewLink = document.querySelector('.mesto__input_second');
const imagePopupLink = imagePopup.querySelector(".popup-img__image");
const imagePopupButtonClose = document.querySelector('.popup-img__close-img')
const imagePopupTitle = imagePopup.querySelector(".popup-img__title");

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 





export {cardForm, imagePopup, popupMain, cardPopup, elementTemplate, 
    profilePopupInputName, profilePopupInputInfo, profilePopupAbout, 
    profilePopupForm, profilePopupButtonEdit, profilePopup, profilePopupName, 
    initialCards, cardPopupForm, profilePopupButtonAdd, pageMain, cardPopupContainer, cardPopupNewName, 
    cardPopupNewLink, imagePopupLink, imagePopupTitle, imagePopupButtonClose,
}