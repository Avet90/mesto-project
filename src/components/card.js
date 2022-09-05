import {openPopupImage, closePopup} from './modal.js'
import {cardPopup, cardForm, elementTemplate, cardPopupContainer, 
    cardPopupNewName, cardPopupNewLink } from './constant.js' 
import { enableValidation } from "./validate";
// Функция создание карточки
function addElement(title, link) {
    const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elementElement.querySelector('.element__img');
  
    // Наполняем содержимым
    elementElement.querySelector('.element__title').textContent = title;
    elementImage.src = link;
    elementImage.alt = title;
  
  
    elementElement.querySelector('.element__korzina').addEventListener('click', function (evt) { 
  
      evt.target.closest('.element').remove(); // Слушатель кнопку удаления 
  
    });
  
    elementElement.querySelector('.element__vector').addEventListener("click", activatesLike); //Слушатель кнопка сердце
  
    elementImage
      .addEventListener("click", () => { 
        openPopupImage(title, link); 
    }); //Слушатель для открытия Картинка
  
    return elementElement;
};

function activatesLike(evt) {
    evt.target.classList.toggle("element__vector_active");
};

// Функция отрисовки карточки
function renderCard(title, link) {
    cardPopupContainer.prepend(addElement(title, link));
};

// Функция добавление карточки Mesto
function createCard(evt) {
    evt.preventDefault();
    renderCard(cardPopupNewName.value, cardPopupNewLink.value);
    closePopup(cardPopup);
    cardForm.reset()
    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    });
};
export{addElement, renderCard, createCard}
