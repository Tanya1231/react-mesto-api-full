import React from "react";

const PopupWithForm = ({
  title,
  name,
  isOpen,
  onClose,
  container,
  buttonText,
  onSubmit,
  children,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className={`popup__container ${container}`}>
        <form
          className={`form form_popup_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button
            type="submit"
            className="form__button"
            value="Сохранить"
          >
            {buttonText}
          </button>
        </form>
        <button onClick={onClose} className="popup__button-close"></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
