/*  */

export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._profileName = document.querySelector('.profile__title');
    this._profileAbout = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    return {
      name: this._name.value = this._profileName.textContent,
      about: this._about.value = this._profileAbout.textContent
    }
  }

  setUserInfo() {
    this._profileName.textContent = this._name.value;
    this._profileAbout.textContent = this._about.value;
  }

}
