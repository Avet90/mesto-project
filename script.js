const main = document.querySelector('.main');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const popupEdit = document.querySelector('.popup-edit');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const editform = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_info');
const elements = document.querySelector('.elements')
const popupMesto = document.querySelector('.mesto')
const closeButtonMesto = document.querySelector('.mesto__close-vector')
const mestoForm = document.querySelector('.mesto__form')
const popupImg = document.querySelector('.popup-img')
const closeButtonImg = document.querySelector('.popup-img__close-img')
const popupImgImage = document.querySelector('.popup-img__image')
const popupImageTitle = document.querySelector('.popup-img__title')
const popupTitle = document.querySelector('.popup__heading') 
const popupContainer = document.querySelector('.popup__container') 
const firstInput = document.querySelector('.popup__input_first'); 
const secondInput = document.querySelector('.popup__input_second');
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


let hearts = document.getElementsByClassName("element__vector");
for (let heart of hearts) {
  heart.addEventListener("click", () => heart.classList.toggle('element__vector_active'));
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function addElement(elementName, elementLink) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  const hearts = elementElement.getElementsByClassName("element__vector");
  const elementImg = elementElement.querySelector('.element__img');

  elementElement.querySelector('.element__title').textContent = elementName;
  elementElement.querySelector('.element__img').src = elementLink;
  elementElement.querySelector('.element__img').alt = elementName;
  elements.prepend(elementElement);

  for (let heart of hearts) {
    heart.addEventListener("click", () => heart.classList.toggle('element__vector_active'));
  };

  elementImg.addEventListener('click', () => {
    openPopupImage(elementLink, elementName)
  });

  elementElement.querySelector('.element__korzina').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

};

function createCard(evt) {
  evt.preventDefault();
  const newName = document.querySelector('.mesto__input_first');
  const newLink = document.querySelector('.mesto__input_second');

  addElement(newName.value, newLink.value);

  newName.value = '';
  newLink.value = '';

  closePopup(popupMesto);
}

function editProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = firstInput.value;
  profileAbout.textContent = secondInput.value;

  closePopup(popupEdit);
};

function openPopupImage(imgLink, imgTitle) {
  openPopup(popupImg);
  popupImgImage.setAttribute('src', imgLink);
  popupImageTitle.textContent = imgTitle;
};


editButton.addEventListener('click', () => {openPopup(popupEdit)});

popupClose.addEventListener('click', () => {closePopup(popupEdit)});

editform.addEventListener('submit', editProfileInfo);

mestoForm.addEventListener('submit', createCard);

addButton.addEventListener('click', () => {openPopup(popupMesto)});

closeButtonMesto.addEventListener('click', () => {closePopup(popupMesto)});

closeButtonImg.addEventListener('click', () => {closePopup(popupImg)});

initialCards.forEach(item => addElement(item.name, item.link));