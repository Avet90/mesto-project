

export const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
    headers: {
      authorization: 'ba6097cc-c5ae-47eb-ae48-050b54337db7',
      'Content-Type': 'application/json'
    }
}
  
export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Код ошибки: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse)
}

export function patchUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(checkResponse)
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse)
}


export function postCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(checkResponse)
}

export function deleteCard(id){
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
}

export function putLike(id){
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse)
    .then((data)=>{
        console.log(data);
    })
}

export function deleteLike(id){
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
}