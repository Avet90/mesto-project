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

const elements = document.querySelector('.elements')

const cardPopup = document.querySelector('.mesto')
const cardPopupButtonClose = document.querySelector('.mesto__close-vector')
const cardPopupForm = document.querySelector('.mesto__form')

const imagePopup = document.querySelector('.popup-img')
const closeButtonImg = document.querySelector('.popup-img__close-img')
const popupImgImage = document.querySelector('.popup-img__image')
const popupImageTitle = document.querySelector('.popup-img__title')
const popupTitle = document.querySelector('.popup__heading') 
const popupContainer = document.querySelector('.popup__container') 

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

  closePopup(cardPopup);
}

function editProfileInfo(evt) {
  evt.preventDefault();
  profilePopupName.textContent = profilePopupInputName.value;
  profilePopupAbout.textContent = profilePopupInputInfo.value;

  closePopup(profilePopup);
};

function openPopupImage(imgLink, imgTitle) {
  openPopup(imagePopup);
  popupImgImage.setAttribute('src', imgLink);
  popupImageTitle.textContent = imgTitle;
};


profilePopupButtonEdit.addEventListener('click', () => {openPopup(profilePopup)});

profilePopupButtonClose.addEventListener('click', () => {closePopup(profilePopup)});

profilePopupForm.addEventListener('submit', editProfileInfo);

cardPopupForm.addEventListener('submit', createCard);

profilePopupButtonAdd.addEventListener('click', () => {openPopup(cardPopup)});

cardPopupButtonClose.addEventListener('click', () => {closePopup(cardPopup)});

closeButtonImg.addEventListener('click', () => {closePopup(imagePopup)});

initialCards.forEach(item => addElement(item.name, item.link));