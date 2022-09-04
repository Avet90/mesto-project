import {profilePopupInputName, profilePopupInputInfo, profilePopup, profilePopupAbout, profilePopupName} from "./constant.js";
import {closePopup} from "./modal.js";

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

export {loadInfoPopupEdit, sendingFormProfile}