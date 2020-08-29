import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../utils/api.js";
import CurrentUserContext from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getUserData().then((res) => {

      setCurrentUser(res);
    }).catch((err) => {
      console.log(err);
    })
      ;
  }, []);

  function handleCardDeleteClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPopupOpen(true);
  }
  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPopupOpen(false);
    setSelectedCard(false);
    setIsOpenImage(false);
    setIsConfirmPopupOpen(false);
  }
  function handleCardClick(card) {

    setSelectedCard(card);
    setIsOpenImage(true);
  }




  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {

        setCards(res.reverse());
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCardData(card._id).then
      (() => { setCards(cards.filter((item) => { return item._id !== card._id })) })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(input) {
    api.saveUserData(input).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(input) {
    api.changeAvatar(input.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });;
  }
  function handleAddPlaceSubmit(input) {
    api.saveCardData(input).then((res) => {
      setCards([...cards, res]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          onConfirmDelete={handleCardDeleteClick}
        />

        <Footer />
        <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
        <AddPlacePopup isOpen={isAddPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
        <PopupWithForm
          name='delete'
          title="Вы уверены?"
          btnText={"Да"}
          close={closeAllPopups}>
        </PopupWithForm>

        {isOpenImage && <ImagePopup close={closeAllPopups} card={selectedCard} />}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
