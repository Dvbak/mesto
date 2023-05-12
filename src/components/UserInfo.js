/*  */

export default class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo(dataInput) {
    this._profileName.textContent = dataInput.name;
    this._profileAbout.textContent = dataInput.about;
  }

}
