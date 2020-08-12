import React from "react";
function PopupWithForm(props) {
  return (
    <section className={props.isOpen ? "popup popup_active" : "popup "}>
      <form
        name={props.name}
        className={`popup__form popup__form_${props.name}`}
        onSubmit={props.onSubmit}
      >
        <button
          className="popup__toggle"
          type="button"
          onClick={props.close}
        />
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button type="submit" className="popup__button">
          {props.btnText}
        </button>
      </form>
    </section>
  );
}
export default PopupWithForm;
