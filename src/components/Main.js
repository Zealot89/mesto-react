import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
function Main({ onEditAvatar, onEditProfile, onAddPlace, onConfirmDelete, handleCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState('');
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
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__image-button"
          ></button>
          <img className="profile__avatar" src={userAvatar} alt={userName} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">

          {cards.map((item) =>
            <Card card={item} name={item.name} id={item._id} link={item.link} likes={item.likes} onConfirmDelete={onConfirmDelete} handleCardClick={handleCardClick} />

          )}
        </ul>
      </section>
    </main>
  );
}
export default Main;
