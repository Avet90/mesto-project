export default class UserInfo {
    constructor(userData) {
        this._userName = document.querySelector(userData.userName);
        this._userInfo = document.querySelector(userData.userInfo);
        this._userAvatar = document.querySelector(userData.userAvatar);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    setUserInfo({ name, info }) {
        this._userName.textContent = name;
        this._userInfo.textContent = info
    }


    setUserAvatar({ avatar }) {
        this._userAvatar = avatar
    }
}