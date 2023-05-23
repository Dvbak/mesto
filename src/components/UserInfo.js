/*  */

export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileAbout = document.querySelector(userAboutSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({name, avatar, about}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
  }

}
