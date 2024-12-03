export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Handle response
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Fetch request
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  /* ---------------------------------- Cards --------------------------------- */

  // Get all cards
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // Create a card
  addCard({ name, link }) {
    if (!name || !link) {
      return Promise.reject("Missing name or link");
    }
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  // Delete a card
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Like a card
  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Dislike a card
  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  /* ------------------------------ User Profile ------------------------------ */

  // Get the current user's info
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // Update your profile information
  setUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  // Update Avatar
  setUserAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }

  // Get initial data
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
