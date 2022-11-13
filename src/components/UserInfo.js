export default class UserInfo {
    constructor(userData) {
        this._userTitle = document.querySelector(userData.userTitle);
        this._userSubtitle = document.querySelector(userData.userSubtitle);
        this._userAvatar = document.querySelector(userData.userAvatarImage);
    }

    getUserID() {
        return
    }

    getUserInfo() {
        return {
            name: this._userTitle.textContent,
            about: this._userSubtitle.textContent
        }
    }

    setUserInfo({ name, about }) {
        this._userTitle.textContent = name;
        this._userSubtitle.textContent = about;
    }


    setUserAvatar({ avatar }) {
        this._userAvatar.src = avatar;
    }


}