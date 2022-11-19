import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = props => {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = evt => {
    setName(evt.target.value);
  };

  const handleAboutChange = evt => {
    setAbout(evt.target.value);
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateProfile({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title=" Редактировать профиль"
      name="profile"
      container="popup__container-profile"
      buttonText="Сохранить"
    >
      <input
        className="form__container form__container_type_name"
        name="name"
        type="text"
        placeholder="Имя"
        id="name"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="error" id="name-error"></span>
      <input
        className="form__container form__container_type_info"
        name="about"
        type="text"
        placeholder="О себе"
        id="about"
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={handleAboutChange}
        required
      />
      <span className="error" id="about-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
