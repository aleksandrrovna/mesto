export class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`)
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    }).then((response) => this._handleResponse(response))
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    }).then((response) => this._handleResponse(response))
  }

  editProfile(userData) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.bio
      })
    }).then((response) => this._handleResponse(response))
  }

  addCard(cardObject) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardObject)
    }).then((response) => this._handleResponse(response))
  }
}