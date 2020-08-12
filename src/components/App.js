import React from "react";
import PopupWithForm from "./popupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

function App() {
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);

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
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
        onConfirmDelete={handleCardDeleteClick}
      />

      <Footer />
      <PopupWithForm
        name=""
        title="Редактировать профиль"
        isOpen={isProfilePopupOpen}
        btnText={"Сохранить"}
        close={closeAllPopups}
      >
        <label className="popup__input-wrapper">
          <input
            className="popup__input popup__input_name "
            id="name"
            placeholder="Имя"
            name="name"
            tabindex="1"
            minLength="2"
            maxLength="40"
            required
            type="text"
          />
          <span className="popup__error" id="name-error"></span>
        </label>
        <label className="popup__input-wrapper">
          <input
            className="popup__input popup__input_activiti"
            id="activiti"
            placeholder="Род занятий"
            name="about"
            tabindex="2"
            type="text"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error" id="activiti-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name=""
        title="Новое место"
        isOpen={isAddPopupOpen}
        btnText={"Добавить"}
        close={closeAllPopups}
      >
        <label className="popup__input-wrapper">
          <input
            className="popup__input popup__input_place"
            id="name-card"
            placeholder="Название"
            name="name"
            tabindex="1"
            type="text"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="popup__error" id="name-card-error"></span>
        </label>
        <label className="popup__input-wrapper">
          <input
            className="popup__input popup__input_link"
            id="link"
            placeholder="Ссылка на картинку"
            name="link"
            tabindex="2"
            type="url"
            required
          />
          <span className="popup__error" id="link-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name=""
        title="Обновить аватар"
        isOpen={isAvatarPopupOpen}
        btnText={"Сохранить"}
        close={closeAllPopups}
      >
        <label className="popup__input-wrapper">
          <input
            className="popup__input popup__input_link-avatar"
            id="link"
            placeholder="Ссылка на картинку"
            name="link"
            tabindex="2"
            type="url"
            required
          />
          <span className="popup__error" id="link-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name='delete'
        title="Вы уверены?"
        isOpen={isConfirmPopupOpen}
        btnText={"Да"}
        close={closeAllPopups}>
      </PopupWithForm>
      {isOpenImage && <ImagePopup close={closeAllPopups} card={selectedCard} />}

    </div>
  );
}

export default App;
