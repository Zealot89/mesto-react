import React from 'react';
function Card({ card, name, id, link, likes, handleCardClick, onConfirmDelete }) {
    function cardClick() {
        handleCardClick(card);
    }
    return (
        <li className="elements__element elements__element_add" id={id}>
            <button className="elements__delete-button" onClick={onConfirmDelete} type="button" />
            <img
                className="elements__image elements__image_add"
                src={link}
                alt={name}
                onClick={cardClick}
            />
            <h2 className="elements__title elements__title_add">{name}</h2>
            <button className="elements__button" type="button" />
            <p className="elements__like-counter">{likes.length}</p>
        </li>
    );
}
export default Card;