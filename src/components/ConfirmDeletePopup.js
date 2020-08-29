import React from "react";
import PopupWithForm from './PopupWithForm.js';
function ConfirmDeletePopup({isOpen, onClose}){

    return(
        <PopupWithForm
        isOpen={isOpen}
          name='delete'
          title="Вы уверены?"
          btnText={"Да"}
          close={onClose}>
        </PopupWithForm>

    )
}