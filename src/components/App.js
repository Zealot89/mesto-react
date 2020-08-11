import React from "react";
import PopupWidthForm from "./popupWidthForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);


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
    setIsOpenImage(false)
  }
  function handleCardClick(card) {
    setIsOpenImage(true);
    setSelectedCard(card);
  }
  return (
    <div class="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
      />

      <Footer />
      <PopupWidthForm
        name=""
        title="Редактировать профиль"
        isOpen={isProfilePopupOpen}
        btnText={"Сохранить"}
        close={closeAllPopups}
      >
        <label class="popup__input-wrapper">
          <input
            class="popup__input popup__input_name "
            id="name"
            placeholder="Имя"
            name="name"
            tabindex="1"
            minlength="2"
            maxlength="40"
            required
            type="text"
          />
          <span class="popup__error" id="name-error"></span>
        </label>
        <label class="popup__input-wrapper">
          <input
            class="popup__input popup__input_activiti"
            id="activiti"
            placeholder="Род занятий"
            name="about"
            tabindex="2"
            type="text"
            minlength="2"
            maxlength="200"
            required
          />
          <span class="popup__error" id="activiti-error"></span>
        </label>
      </PopupWidthForm>
      <PopupWidthForm
        name=""
        title="Новое место"
        isOpen={isAddPopupOpen}
        btnText={"Добавить"}
        close={closeAllPopups}
      >
        <label class="popup__input-wrapper">
          <input
            class="popup__input popup__input_place"
            id="name-card"
            placeholder="Название"
            name="name"
            tabindex="1"
            type="text"
            minlength="1"
            maxlength="30"
            required
          />
          <span class="popup__error" id="name-card-error"></span>
        </label>
        <label class="popup__input-wrapper">
          <input
            class="popup__input popup__input_link"
            id="link"
            placeholder="Ссылка на картинку"
            name="link"
            tabindex="2"
            type="url"
            required
          />
          <span class="popup__error" id="link-error"></span>
        </label>
      </PopupWidthForm>
      <PopupWidthForm
        name=""
        title="Обновить аватар"
        isOpen={isAvatarPopupOpen}
        btnText={"Сохранить"}
        close={closeAllPopups}
      >
        <label class="popup__input-wrapper">
          <input
            class="popup__input popup__input_link-avatar"
            id="link"
            placeholder="Ссылка на картинку"
            name="link"
            tabindex="2"
            type="url"
            required
          />
          <span class="popup__error" id="link-error"></span>
        </label>
      </PopupWidthForm>
      {isOpenImage && <ImagePopup close={closeAllPopups} card={selectedCard} />}

    </div>
  );
}

export default App;
