const main = document.querySelector('.main');
const profilePopup = document.querySelector('.popup-edit');
const profilePopupName = document.querySelector('.profile__title');
const profilePopupAbout = document.querySelector('.profile__subtitle');
const profilePopupForm = document.querySelector('.popup__form');
const profilePopupInputName = document.querySelector('.popup__input_name'); 
const profilePopupInputInfo = document.querySelector('.popup__input_info');
const profilePopupButtonEdit = document.querySelector('.profile__edit-button');
const profilePopupButtonAdd = document.querySelector('.profile__add-button');
const profilePopupButtonClose = document.querySelector('.popup__close');

const cardPopup = document.querySelector('.mesto')
const cardPopupContainer = document.querySelector('.elements')
const cardPopupButtonClose = document.querySelector('.mesto__close-vector')
const cardPopupForm = document.querySelector('.mesto__form')
const cardPopupNewName = document.querySelector('.mesto__input_first');
const cardPopupNewLink = document.querySelector('.mesto__input_second');



const imagePopup = document.querySelector('.popup-img')
const imagePopupButtonClose = document.querySelector('.popup-img__close-img')
const imagePopupPicture = document.querySelector('.popup-img__image')
const imagePopupTitle = document.querySelector('.popup-img__title')

const elementTemplate = document.querySelector('#element-template').content;


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

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Функция создание карточки
function addElement(elementName, elementLink) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardPopupButtonHeart = elementElement.getElementsByClassName("element__vector");
  const elementImg = elementElement.querySelector('.element__img');

  // Наполняем содержимым
  elementElement.querySelector('.element__title').textContent = elementName;
  elementElement.querySelector('.element__img').src = elementLink;
  elementElement.querySelector('.element__img').alt = elementName;

  for (let heart of cardPopupButtonHeart) {
    heart.addEventListener("click", () => heart.classList.toggle('element__vector_active')); //Слушатель Like
  };

  elementImg.addEventListener('click', () => {
    openPopupImage(elementLink, elementName)   //Слушатель открытия картинки
  });

  elementElement.querySelector('.element__korzina').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove(); // Слушатель кнопку удаления
  });
  return elementElement;
};


// Функция отрисовки карточки
function renderCard(title, link) {
  cardPopupContainer.prepend(addElement(title, link));
}


// Функция добавление карточки
function createCard(evt) {
  evt.preventDefault();

  renderCard(cardPopupNewName.value, cardPopupNewLink.value);

  cardPopupNewName.value = '';
  cardPopupNewLink.value = '';

  closePopup(cardPopup);
}


// Функция подгрузки информации о пользователе в соответствующие поля
function editProfileInfo(evt) {
  evt.preventDefault();
  profilePopupName.textContent = profilePopupInputName.value;
  profilePopupAbout.textContent = profilePopupInputInfo.value;

  closePopup(profilePopup);
};


// Функция открытие картинки
 function openPopupImage(imgLink, imgTitle) {
  imagePopupPicture.setAttribute('src', imgLink);
  imagePopupTitle.textContent = imgTitle;

  openPopup(imagePopup);
};


profilePopupButtonEdit.addEventListener('click', () => {openPopup(profilePopup)});

profilePopupButtonClose.addEventListener('click', () => {closePopup(profilePopup)});

profilePopupForm.addEventListener('submit', editProfileInfo);

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)});

cardPopupButtonClose.addEventListener('click', () => {closePopup(cardPopup)});

imagePopupButtonClose.addEventListener('click', () => {closePopup(imagePopup)});

initialCards.forEach(item => renderCard(item.name, item.link));