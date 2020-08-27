class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserData(func) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        func(res);
        return res;
      });
  }

  saveUserData({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err);
    });;
  }

  saveCardData({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
      return res.json();
    });
  }

  deleteCardData(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });
  }

  changeLikeCardStatus(cardId, isLike) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: isLike ? ('PUT') : ('DELETE'),
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //likeCard(user, item, card) {
  //  const myLike = item.likes.find((currentUser, index, array) => {
  //    if (currentUser._id === user._id) array.splice(index, 1);
  //    return currentUser._id === user._id;
  //  });
  //  if (!myLike) item.likes.push(user);
  //  return fetch(`${this.baseUrl}/cards/likes/${item._id}`, {
  //    method: myLike ? "DELETE" : "PUT",
  //    headers: {
  //      authorization: this.token,
  //      "Content-Type": "application/json",
  //    },
  //  }).then((res) => {
  //    if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
  //    res.json().then((res) => {
  //      card.querySelector(".elements__like-counter").textContent =
  //        res.likes.length;
  //      card
  //        .querySelector(".elements__button")
  //        .classList.toggle("elements__button_active");
  //    });
  //  });
  //}

  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      if (res.ok) { return res.json(); }
      return Promise.reject(`Ошибка: ${res.status}`);
      //return res.json();
    }).catch((err) => {
      console.log(err);
    });;
  }
}

//Экземпляр класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
  headers: {
    authorization: "a34a1e6b-d078-470d-87dd-2211c9e10f70",
    "Content-Type": "application/json",
  },
});
export default api;
