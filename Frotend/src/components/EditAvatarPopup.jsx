import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = props => {
  const avataRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avataRef.current.value);
  }

  React.useEffect(() => {
    avataRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      container="popup__container-avatar"
    >
      <input
        className="form__container form__container_type_avatar"
        name="avatar"
        type="url"
        placeholder="https://somewebsite.com/someimage.jpg"
        id="avatar"
        ref={avataRef}
        required
      />
      <span className="error" id="avatar-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
