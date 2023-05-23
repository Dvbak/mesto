/*  */

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._passkey = options.headers.authorization;
  }

  getInfo() {
    return fetch (`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._passkey
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._passkey
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  setInfoProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deletCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._passkey
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._passkey
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deletLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._passkey
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
}
