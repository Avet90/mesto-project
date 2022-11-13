export default class Card {
  constructor(
    data,
    cardConstructor,
    { userData, handleLike, handleLikeDelete, requestDelete, handleImageClick }
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userData;

    this._constructor = cardConstructor;
    this._handleLike = handleLike;
    this._handleLikeDelete = handleLikeDelete;
    this._requestDelete = requestDelete;
    this._handleImageClick = handleImageClick;
  }

  _checkId() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add("element__delete-icon_type_hidden");
    }
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._constructor)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _checkLikeUserSet() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add("element__like_active");
      }
    });
  }

  _getLikesCounter() {
    this._counter.textContent = this._likes.length;
  }

  like(data) {
    this._likeButton.classList.add("element__like_active");
    return (this._counter.textContent = `${data.likes.length}`);
  }

  deleteLike(data) {
    this._likeButton.classList.remove("element__like_active");
    return (this._counter.textContent = `${data.likes.length}`);
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener("click", () => {
      if (!this._likeButton.classList.contains("element__like_active")) {
        this._handleLike();
      } else {
        this._handleLikeDelete();
      }
    });

    this._deleteButton.addEventListener("click", () => {
      this._requestDelete();
    });
  }

  deleteCard() {
    this._element.remove();
  }

  createCard() {
    this._element = this._getElement();
    this._image = this._element.querySelector(".element__img");
    this._deleteButton = this._element.querySelector(".element__korzina");
    this._likeButton = this._element.querySelector(".element__like-block");
    this._counter = this._element.querySelector(".element__vector-counter");
    this._element.querySelector(".element__title").textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    // this._getLikesCounter();
    // this._checkId();
    // this._checkLikeUserSet();
    // this._setEventListeners();

    return this._element;
  }
}

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
