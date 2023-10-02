class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, options).then(this._checkResponse);
  }

  getInfo(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getCards(token) {
    return this._request('/cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  sentUsersData(data, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: data.name, about: data.job })
    });
  }

  createCard(data, token) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: data.name, link: data.link })
    });
  }

  addAvatar(data, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ avatar: data.avatar })
    });
  }

  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  addLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
});


  
  
  
  
  