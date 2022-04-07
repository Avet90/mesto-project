const main = document.querySelector('.main');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const editform = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_info');

let hearts = document.getElementsByClassName("element__vector");
for (let heart of hearts) {
  heart.addEventListener("click", () => heart.classList.toggle('element__vector_active'));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function editProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(popupEdit);
};

editButton.addEventListener('click', () => {openPopup(popupEdit)});
popupClose.addEventListener('click', () => {closePopup(popupEdit)});
editform.addEventListener('submit', editProfileInfo);
