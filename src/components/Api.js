export class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _handleResponse(response) {
    response.ok
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
}
