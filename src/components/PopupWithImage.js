import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._imageTitle = this._popup.querySelector('.popup-img__title');
        this._imageSrc = this._popup.querySelector('.popup-img__image');
    }

    open = (imageTitle, imageLink) => {
        this._imageTitle.textContent = imageTitle;
        this._imageSrc.src = imageLink;
        this._imageSrc.alt = imageTitle;
        super.open()
    };
}