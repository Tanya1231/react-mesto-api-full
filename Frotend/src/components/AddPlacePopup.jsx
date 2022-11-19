import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleNameChange = evt => {
    setName(evt.target.value);
  };

  const handleLinkChange = evt => {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      container="popup__container-add-card"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="form__container form__container_type_inf"
        name="name"
        id="info"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="error" id="info-error"></span>
      <input
        className="form__container form__container_type_src"
        name="link"
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <span className="error" id="link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
