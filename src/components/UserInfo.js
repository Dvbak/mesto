/*  */

export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}, userId) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileAbout = document.querySelector(userAboutSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
    this._userId = userId; // Необходимо ли объявлять поле класса заранее, не имея еще его значения? Или же надо делать это через публичный метод setUserInfo только при получении значения.
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo({name, avatar, about, _id}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
    this._userId = _id;
  }

}
