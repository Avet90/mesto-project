import {cardPopup, profilePopup, profilePopupButtonEdit, profilePopupForm, cardPopupForm, profilePopupButtonAdd, profilePopupInputName, profilePopupInputInfo, profilePopupAbout, profilePopupName, profilePopupAvatar, elementTemplate, cardPopupContainer, cardPopupNewName, cardPopupNewLink, deletePopup, deleteFormElement, avatarOpenBtn, avatarPopup, avatarPopupLink, avatarFormElement} from "./constant.js";
import {openPopup, closePopup, } from "./modal.js";
import {renderCard} from "./card.js";
import {enableValidation} from "./validate.js";
import {disableButton} from './utils.js'
import Api from './api.js';
import '/src/pages/index.css';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards])=>{
    profilePopupName.textContent = userData.name;
    profilePopupAbout.textContent = userData.about;
    profilePopupAvatar.src = userData.avatar;
    userId = userData._id;

    cards.forEach((card) => {
      renderCard(card.name, card.link, card._id, card.likes, card.owner._id, userId);
    })
  })
  .catch((err)=>{
    console.error('Ошибка при загрузке данных с сервера.', err);
});

function sendingFormProfile(evt) {
  evt.preventDefault(); 
  evt.submitter.textContent = 'Сохранение...'
  api.patchUserInfo(profilePopupInputName.value, profilePopupInputInfo.value)
  .then(() => {
    profilePopupName.textContent = profilePopupInputName.value;
    profilePopupAbout.textContent = profilePopupInputInfo.value;
    closePopup(profilePopup);
  })
  .catch((err) => {
    console.error('Ошибка при сохранении профиля.', err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить'
  });
};

function createCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  api.postCard(cardPopupNewName.value, cardPopupNewLink.value)
  .then((result)=>{
    renderCard(cardPopupNewName.value, cardPopupNewLink.value, result._id, [],  result.owner._id, userId);
    closePopup(cardPopup);
    evt.target.reset();
  })
  .catch((err) => {
    console.error('Ошибка при сохранении профиля.', err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Создать'
  });
};

// обработчик формы подтверждения удаления карточки
function handleDeleteElementFormSubmit(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Удаление...'
  const promiseDeleteCard = api.deleteCard(deletePopup.dataset.deletedElement)
    .then(() => {
      document.getElementById(deletePopup.dataset.deletedElement).remove();
      closePopup(deletePopup);
      deletePopup.dataset.deletedElement = '';
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
    });
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  const promisePatchUserAvatar = api.patchUserAvatar(avatarPopupLink.value)
    .then((result) => {
      profilePopupAvatar.src = result.avatar;
      closePopup(avatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error('Ошибка при загрузке нового аватара.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
    });
}

avatarOpenBtn.addEventListener('click', ()=>{
  openPopup(avatarPopup);
});

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

profilePopupButtonEdit.addEventListener("click", function () {
  openPopup(profilePopup);
  profilePopupInputName.value = profilePopupName.textContent;
  profilePopupInputInfo.value = profilePopupAbout.textContent;
});



profilePopupButtonAdd.addEventListener('click', () => {
  openPopup(cardPopup)
});

profilePopupForm.addEventListener("submit", sendingFormProfile);
cardPopupForm.addEventListener('submit', createCard);
deleteFormElement.addEventListener('submit', handleDeleteElementFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);