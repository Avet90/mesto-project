import '/src/pages/index.css';

// import { openPopup, closePopup, } from "./modal.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { disableButton } from './utils.js'
import Api from './Api.js';
import Section from './Section'
import PopupWithForm from './PopupWithForm'
import PopupWithImage from './PopupWithImage'
import UserInfo from './UserInfo'

import {
  cardPopup,
  profilePopup,
  profilePopupButtonEdit,
  profilePopupForm,
  cardPopupForm,
  profilePopupButtonAdd,
  profilePopupInputName,
  profilePopupInputInfo,
  profilePopupAbout,
  profilePopupName,
  profilePopupAvatar,
  elementTemplate,
  cardPopupContainer,
  cardPopupNewName,
  cardPopupNewLink,
  deletePopup,
  deleteFormElement,
  avatarOpenBtn,
  avatarPopup,
  avatarPopupLink,
  avatarFormElement,
  userInfoSelectors,
  // popupSelectors
} from "./constant.js";


let userId;



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userInfoSelectors);

// Create PopupWithForms instances  
const popupEditProfile = new PopupWithForm(".popup-edit", sendingFormProfile);
const popupEditAvatar = new PopupWithForm(".popup-avatar", sendingFormProfile);
const popupDeleteCard = new PopupWithForm(".popup-delete", sendingFormProfile);
const popupAddCard = new PopupWithForm(".mesto", sendingFormProfile);
// Set eventlisteners for PopupWithForms instances  
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
popupAddCard.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // profilePopupName.textContent = userData.name;
    // profilePopupAbout.textContent = userData.about;
    // profilePopupAvatar.src = userData.avatar;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;

    cards.forEach((card) => {
      renderCard(card.name, card.link, card._id, card.likes, card.owner._id, userId);
    })
  })
  .catch((err) => {
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
    .then((result) => {
      this.render(cardPopupNewName.value, cardPopupNewLink.value, result._id, [], result.owner._id, userId);
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
function handleDeleteElementFormSubmit(evt) {
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

function handleAvatarFormSubmit(evt) {
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

avatarOpenBtn.addEventListener('click', () => {
  // openPopup(avatarPopup);
  popupEditAvatar.open();
});

profilePopupButtonEdit.addEventListener("click", function () {
  // openPopup(profilePopup);
  popupEditProfile.open();
  // console.log(popupEditProfile)
  // profilePopupInputName.value = popupEditProfile.textContent;
  // profilePopupInputInfo.value = profilePopupAbout.textContent;
});


profilePopupButtonAdd.addEventListener('click', () => {
  // openPopup(cardPopup)
  popupAddCard.open();
});

profilePopupForm.addEventListener("submit", sendingFormProfile);
cardPopupForm.addEventListener('submit', createCard);
deleteFormElement.addEventListener('submit', handleDeleteElementFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);