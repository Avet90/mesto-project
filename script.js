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

// Функция сердечка
function activatesLike(evt) {
  evt.target.classList.toggle("element__vector_active");
}

// Функция удаления карточки
function deleteCard() {
  const listItem = cardPopupContainer
  .querySelector(".element__korzina")
  .closest('.element');
listItem.remove();
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Функция создание карточки
function addElement(title, link) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

  // Наполняем содержимым
  elementElement.querySelector('.element__title').textContent = title;
  elementElement.querySelector('.element__img').src = link;
  elementElement.querySelector('.element__img').alt = title;


  elementElement.querySelector('.element__korzina').addEventListener('click', deleteCard); // Слушатель кнопку удаления

  elementElement.querySelector('.element__vector').addEventListener("click", activatesLike); //Слушатель кнопка сердце

  elementElement
    .querySelector('.element__img')
    .addEventListener("click", () => { 
      openPopupImage(title, link); 
  }); //Слушатель для открытия Картинка

  return elementElement;
}

// Функция отрисовки карточки
function renderCard(title, link) {
  cardPopupContainer.prepend(addElement(title, link));
}

// Функция добавление карточки
function createCard(evt) {
  evt.preventDefault();

  renderCard(cardPopupNewName.value, cardPopupNewLink.value);

  closePopup(cardPopup);

  cardPopupNewName.value = '';
  cardPopupNewLink.value = '';

}


// editProfile
function loadInfoPopupEdit() {
  profilePopupInputName.value = profilePopupName.textContent;
  profilePopupInputInfo.value = profilePopupAbout.textContent;
};

profilePopupButtonEdit.addEventListener("click", function () {
  loadInfoPopupEdit();
  openPopup(profilePopup);
});

function sendingFormProfile(evt) {
  evt.preventDefault(); 
  profilePopupName.textContent = profilePopupInputName.value;
  profilePopupAbout.textContent = profilePopupInputInfo.value;
  closePopup(profilePopup);
}

profilePopupForm.addEventListener("submit", sendingFormProfile);


// Функция открытие картинки
function openPopupImage(title, link) { 
  const imgTitle = imagePopup.querySelector(".popup-img__title");
  const imgLink = imagePopup.querySelector(".popup-img__image");
  imgTitle.textContent = title;
  imgLink.src = link;
  imgLink.alt = title;
  openPopup(imagePopup);
  
}


profilePopupButtonClose.addEventListener('click', () => {closePopup(profilePopup)});

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)});

cardPopupButtonClose.addEventListener('click', () => {closePopup(cardPopup)});

imagePopupButtonClose.addEventListener('click', () => {closePopup(imagePopup)});

initialCards.forEach(item => renderCard(item.name, item.link));