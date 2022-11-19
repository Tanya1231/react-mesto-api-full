import React from "react";

const ImagePopup = ({ isOpen, card, onClose }) => {
  return (
    <div className={`popup popup_open-img ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container-image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__subtitle">{card.name}</h2>
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
