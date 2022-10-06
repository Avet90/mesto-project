import { data } from "autoprefixer";
import {profilePopupInputName, profilePopupInputInfo, profilePopup, profilePopupAbout, profilePopupName, profilePopupAvatar, } from "./constant.js";
import {closePopup} from "./modal.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Код ошибки: ${res.status}`);
}

function loadInfoProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(checkResponse)
  .then((data) => {
    profilePopupName.textContent = data.name;
    profilePopupAbout.textContent = data.about;
    profilePopupAvatar.src = data.avatar;
  });
};

function loadInfoPopupEdit() {
  profilePopupInputName.value = profilePopupName.textContent;
  profilePopupInputInfo.value = profilePopupAbout.textContent;
};

function sendingFormProfile(evt) {
  evt.preventDefault(); 
  // return fetch(`${config.baseUrl}/users/me`, {
  //   method: 'PATCH',
  //   headers: config.headers,
  //   body: JSON.stringify({
  //     name: evt.name,
  //     about: evt.about,
  //   })
  // })
  // .then(res => res.json())
  // .then((data) => {
  //   console.log(data);
  //   data.name = profilePopupInputName.value;
  //   data.about = profilePopupInputInfo.value;
  // })
  profilePopupName.textContent = profilePopupInputName.value;
  profilePopupAbout.textContent = profilePopupInputInfo.value;
  closePopup(profilePopup);
};


export {loadInfoPopupEdit, sendingFormProfile, loadInfoProfile, }