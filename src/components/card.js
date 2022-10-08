import {openPopupImage, openPopup} from './modal.js'
import {elementTemplate, cardPopupContainer, deletePopup} from './constant.js' 
import {handleDeleteLike, handlePutLike} from './index.js';

// Функция создание карточки
export function addElement(name, link, id, likes, ownerId, userId) {
    const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementTitle = elementElement.querySelector('.element__title');
    const elementImage = elementElement.querySelector('.element__img');
    const elementLike = elementElement.querySelector('.element__vector');
    const elementLikeCounter = elementElement.querySelector('.element__vector_counter');
    const elementDelete = elementElement.querySelector('.element__korzina');

    // Наполняем содержимым
    elementTitle.textContent = name;
    elementImage.src = link;
    elementImage.alt = name;
    elementLike.addEventListener("click", toggleLike); //Слушатель кнопка сердце
    if (ownerId === userId) {
      elementDelete.addEventListener('click', destroyElement)
    } else {
      elementDelete.remove();
    }
    elementImage.addEventListener("click", () => openPopupImage(name, link))
    elementElement.id = id;
    elementLikeCounter.textContent = likes.length;
    if (likes.some((like) => {
      return like._id === userId;
    })) {
      elementLike.classList.add('element__vector_active');
    } 
    return elementElement;
};

// Функция отрисовки карточки
export function renderCard(name, link, id, likes, ownerId, userId) {
  const element = addElement(name, link, id, likes, ownerId, userId)
  cardPopupContainer.prepend(element);
};

// удаление элемента
function destroyElement(evt) {
  deletePopup.dataset.deletedElement = evt.target.closest('.element').id;
  openPopup(deletePopup);
}

export function shutdownButton() {
  const buttonMesto = document.querySelector(".mesto__add");
  buttonMesto.setAttribute("disabled", true);
  buttonMesto.classList.add('button_inactive');
};


function toggleLike(evt) {
  if (evt.target.classList.contains('element__vector_active')) {
    handleDeleteLike(evt.target.closest('.element').id);
  } else {
    handlePutLike(evt.target.closest('.element').id);
  }
}

export function redrawLikeCounter(cardId, likeCounter) {
  document.getElementById(cardId).querySelector('.element__vector_counter').textContent = likeCounter;
}
