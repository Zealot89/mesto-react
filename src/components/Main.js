import React from "react";
import { api } from "../utils/Api.js";
import Card from './Card.js';
function Main({ onEditAvatar, onEditProfile, onAddPlace, handleCardClick }) {
  const [userName, setUserName] = React.useState(false);
  const [userDescription, setUserDescription] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData(function (name, about, avatar) {
      setUserName(name);
      setUserDescription(about);
      setUserAvatar(avatar);
    });
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.reverse());
      })
  }, []);
  
  return (
    <main class="content">
      <section class="profile">
        <div class="profile__container">
          <button
            onClick={onEditAvatar}
            type="button"
            class="profile__image-button"
          ></button>
          <img class="profile__avatar" src={userAvatar} alt={userName} />
        </div>
        <div class="profile__info">
          <h1 class="profile__title">{userName}</h1>
          <p class="profile__subtitle">{userDescription}</p>
          <button
            onClick={onEditProfile}
            class="profile__edit-button"
            type="button"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          class="profile__add-button"
          type="button"
        ></button>
      </section>
      <section class="elements">
        <ul className="elements__list">

          {cards.map((item) =>
            <Card card={item} name={item.name} id={item._id} link={item.link} likes={item.likes} handleCardClick={handleCardClick} />

          )}
        </ul>
      </section>
    </main>
  );
}
export default Main;
