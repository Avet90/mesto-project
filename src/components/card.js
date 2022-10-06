import {openPopupImage, closePopup} from './modal.js'
import {cardPopup, cardForm, elementTemplate, cardPopupContainer, 
    cardPopupNewName, cardPopupNewLink } from './constant.js' 

//Функция загрузки карточки
function loadCards() {
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-15/cards/', {
    headers: {
      authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7'
    }
  })
  .then(res => res.json())
  .then((data) => {
    const initial = data;
    initial.forEach(item => renderCard(item.name, item.link));
  });
};

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
    fetch('https://mesto.nomoreparties.co/v1/plus-cohort-15/cards/', {
      method: 'POST',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '',
        link: '',
      })
    })
    renderCard(cardPopupNewName.value, cardPopupNewLink.value);
    closePopup(cardPopup);
    cardForm.reset();
};


function shutdownButton() {
    const buttonMesto = document.querySelector(".mesto__add");
    buttonMesto.setAttribute("disabled", true);
    buttonMesto.classList.add('button_inactive');
  };

export{addElement, renderCard, createCard, shutdownButton, loadCards}
 
