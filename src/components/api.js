export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => this._checkResponse(res))
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => this._checkResponse(res))
  }

  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  putLike(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => this._checkResponse(res))
  }
}


// export const config = {
//     baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
//     headers: {
//       authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7',
//       'Content-Type': 'application/json'
//     }
// }
  
// export function checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Код ошибки: ${res.status}`);
// }

// export function getUserInfo() {
//     return fetch(`${config.baseUrl}/users/me`, {
//         headers: config.headers
//     })
//     .then(checkResponse)
// }

// export function patchUserInfo(name, about) {
//     return fetch(`${config.baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: name,
//         about: about
//       })
//     })
//     .then(checkResponse)
// }

// export function getCards() {
//     return fetch(`${config.baseUrl}/cards`, {
//       headers: config.headers
//     })
//     .then(checkResponse)
// }


// export function postCard(name, link) {
//     return fetch(`${config.baseUrl}/cards`, {
//       method: 'POST',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: name,
//         link: link
//       })
//     })
//     .then(checkResponse)
// }

// export function deleteCard(id){
//     return fetch(`${config.baseUrl}/cards/${id}`, {
//       method: 'DELETE',
//       headers: config.headers,
//     })
//     .then(checkResponse)
// }

// export function putLike(id){
//     return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//       method: 'PUT',
//       headers: config.headers,
//     })
//     .then(checkResponse)
// }

// export function deleteLike(id){
//     return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//       method: 'DELETE',
//       headers: config.headers,
//     })
//     .then(checkResponse)
// }

// export function patchUserAvatar(link) {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: link
//     })
//   })
//   .then(checkResponse)
// }