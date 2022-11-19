import React from "react";

import ok from "../images/union.svg";
import err from "../images/union-error.svg";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_type_message popup__type_show_message">
        <div className="element__container-auth">
          <img
            className="popup__icon"
            alt={isSuccess ? "Успешно" : "Ошибка"}
            src={isSuccess ? ok : err}
          />
          <p className="popup__title-auth">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз!"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
