class Auth {
  constructor(url) {
    this._url = url;
  }

  register({password, email}) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
