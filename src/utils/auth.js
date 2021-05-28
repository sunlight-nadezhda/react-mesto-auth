class Auth {
  constructor(url) {
    this._url = url;
  }

  register({email, password}) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });
  }

  authorize({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
