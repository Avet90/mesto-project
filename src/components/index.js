import {cardPopup, profilePopup, profilePopupButtonEdit, profilePopupForm, cardPopupForm, profilePopupButtonAdd, profilePopupInputName, profilePopupInputInfo, profilePopupAbout, profilePopupName, profilePopupAvatar, cardForm, elementTemplate, cardPopupContainer, cardPopupNewName, cardPopupNewLink, deletePopup, deleteFormElement} from "./constant.js";
import {openPopup, closePopup, } from "./modal.js";
import {shutdownButton, renderCard} from "./card.js";
import {enableValidation} from "./validate.js";
import {getUserInfo, patchUserInfo, getCards, postCard, deleteCard, putLike, deleteLike} from './api.js';
import '/src/pages/index.css';

let userId;

Promise.all([getUserInfo(), getCards()])
  .then((result)=>{
    profilePopupName.textContent = result[0].name;
    profilePopupAbout.textContent = result[0].about;
    profilePopupAvatar.src = result[0].avatar;
    userId = result[0]._id;

    result[1].forEach((card) => {
      renderCard(card.name, card.link, card._id, card.likes, card.owner._id, userId);
    })
  })
  .catch((err)=>{
    console.error('Ошибка при загрузке данных с сервера.', err);
});

function sendingFormProfile(evt) {
  evt.preventDefault(); 
  evt.submitter.textContent = 'Сохранение...'
  patchUserInfo(profilePopupInputName.value, profilePopupInputInfo.value)
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
  postCard(cardPopupNewName.value, cardPopupNewLink.value)
  .then((result)=>{
    renderCard(cardPopupNewName.value, cardPopupNewLink.value, result._id, [],  result.owner._id, userId);
    closePopup(cardPopup);
  })
  .catch((err) => {
    console.error('Ошибка при сохранении профиля.', err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Создать'
    evt.target.reset();
  });
};

// обработчик формы подтверждения удаления карточки
function handleDeleteElementFormSubmit(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Удаление...'
  const promiseDeleteCard = deleteCard(deletePopup.dataset.deletedElement)
    .then(() => {
      document.getElementById(deletePopup.dataset.deletedElement).remove();
      closePopup(deletePopup);
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
      deletePopup.dataset.deletedElement = '';
    });
}

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

profilePopupForm.addEventListener("submit", sendingFormProfile);

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)
  shutdownButton();
});

deleteFormElement.addEventListener('submit', handleDeleteElementFormSubmit);