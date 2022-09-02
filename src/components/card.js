import {openPopupImage, closePopup } from './modal.js'
import {cardPopup, profilePopupInputName, profilePopupInputInfo, 
    profilePopup, profilePopupName, profilePopupAbout, cardForm
} from './constant.js'

// Функция создание карточки
function addElement(title, link) {
    const elementTemplate = document.querySelector('#element-template').content;
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
    const cardPopupContainer = document.querySelector('.elements')
    cardPopupContainer.prepend(addElement(title, link));
};

// Функция добавление карточки Mesto
function createCard(evt) {
    evt.preventDefault();
    const cardPopupNewName = document.querySelector('.mesto__input_first');
    const cardPopupNewLink = document.querySelector('.mesto__input_second');
    renderCard(cardPopupNewName.value, cardPopupNewLink.value);
    closePopup(cardPopup);
    cardForm.reset();
};

function loadInfoPopupEdit() {
  profilePopupInputName.value = profilePopupName.textContent;
  profilePopupInputInfo.value = profilePopupAbout.textContent;
};

function sendingFormProfile(evt) {
  evt.preventDefault(); 
  profilePopupName.textContent = profilePopupInputName.value;
  profilePopupAbout.textContent = profilePopupInputInfo.value;
  closePopup(profilePopup);
};
export{addElement, renderCard, createCard, sendingFormProfile, loadInfoPopupEdit}