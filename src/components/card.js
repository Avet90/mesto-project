export default class Card {
  constructor(name, link, _id, likes, ownerId, userId, templateSelector, handleCardClick, handleLikeClick, openConfirmform) {
    this._name = name;
    this._link = link;
    this.cardId = _id;
    this.likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._openConfirmForm = openConfirmform;
  }

  _makeTamplate(){
    const elementTemplate = document.querySelector(this._templateSelector).content;
    this._elementElement = elementTemplate.querySelector('.element').cloneNode(true);
    this._elementElement.querySelector('.element__title').textContent = this._name;
    this._photo = this._elementElement.querySelector('.element__img');
    this._likeButton = this._elementElement.querySelector('.element__vector');
    this._likeCounter = this._elementElement.querySelector('.element__vector_counter');
    this._deleteButtton = this._elementElement.querySelector('.element__korzina');
    this._photo.src = this._link;
    this._photo.alt = this._name;

    if (this._ownerId != this._userId) {
        this._deleteButtton.remove();
    }
    this._setLikeState();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._deleteButtton.addEventListener('click', () => this._openConfirmForm(this));
    this._photo.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  hasLiked() {
    return this.likes.some((like) => like.id === this._userId);
  }

  _setLikeState() {
    this._likeCounter.textContent = this.likes.length;
    if (this.hasLiked()) {
        this._likeButton.classList.add('element__vector_active')
    } else {
        this._likeButton.classList.remove('element__vector_active');
    }
  }

  toggleLike() {
    this._setLikeState()
  }

  deleteCard() {
    this._elementElement.remove();
    this._elementElement = null;
  }

  render() {
    this._makeTamplate();
    this._setEventListeners();
    return this._elementElement;
  }
};

// import {openPopupImage, openPopup} from './modal.js'
// import {elementTemplate, cardPopupContainer, deletePopup} from './constant.js' 
// import {putLike, deleteLike} from './api'

// export function addElement(name, link, id, likes, ownerId, userId) {
//     const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
//     const elementTitle = elementElement.querySelector('.element__title');
//     const elementImage = elementElement.querySelector('.element__img');
//     const elementLike = elementElement.querySelector('.element__vector');
//     const elementLikeCounter = elementElement.querySelector('.element__vector_counter');
//     const elementDelete = elementElement.querySelector('.element__korzina');

//     // Наполняем содержимым
//     elementTitle.textContent = name;
//     elementImage.src = link;
//     elementImage.alt = name;
//     elementLike.addEventListener("click", toggleLike); //Слушатель кнопка сердце
//     if (ownerId === userId) {
//       elementDelete.addEventListener('click', destroyElement)
//     } else {
//       elementDelete.remove();
//     }
//     elementImage.addEventListener("click", () => openPopupImage(name, link))
//     elementElement.id = id;
//     elementLikeCounter.textContent = likes.length;
//     if (likes.some((like) => {
//       return like._id === userId;
//     })) {
//       elementLike.classList.add('element__vector_active');
//     } 
//     return elementElement;
// };

// // Функция отрисовки карточки
// export function renderCard(name, link, id, likes, ownerId, userId) {
//   const element = addElement(name, link, id, likes, ownerId, userId)
//   cardPopupContainer.prepend(element);
// };

// // удаление элемента
// function destroyElement(evt) {
//   deletePopup.dataset.deletedElement = evt.target.closest('.element').id;
//   openPopup(deletePopup);
// }

// //Перекинуть в Апи
// //Функция добавления Like
// function handlePutLike(cardId) {
//   putLike(cardId)
//   .then((result)=>{
//     document.getElementById(cardId).querySelector('.element__vector').classList.add('element__vector_active');
//     redrawLikeCounter(cardId, result.likes.length)
//   })
//   .catch((err) => {
//     console.error('Ошибка при сохранении лайка на сервере.', err);
//   })
// }

// //Перекинуть в Апи
// //Функция удаление Like
// export function handleDeleteLike(cardId) {
//   deleteLike(cardId)
//     .then((result) => {
//       document.getElementById(cardId).querySelector('.element__vector').classList.remove('element__vector_active');
//       redrawLikeCounter(cardId, result.likes.length)
//     })
//     .catch((err) => {
//       console.error('Ошибка при удалении лайка на сервере.', err);
//     })
// }


// function toggleLike(evt) {
//   if (evt.target.classList.contains('element__vector_active')) {
//     handleDeleteLike(evt.target.closest('.element').id);
//   } else {
//     handlePutLike(evt.target.closest('.element').id);
//   }
// }

// export function redrawLikeCounter(cardId, likeCounter) {
//   document.getElementById(cardId).querySelector('.element__vector_counter').textContent = likeCounter;
// }
