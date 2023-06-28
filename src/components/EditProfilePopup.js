import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <>
      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        formName="infoform"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_content_name"
            type="text"
            id="name-input"
            name="username"
            value={name || ''}
            placeholder="Имя"
            required=""
            minLength={2}
            maxLength={40}
            onChange={handleChangeName}
          />
          <span className="popup__error name-input-error" />
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_content_occupation"
            type="text"
            id="occupation-input"
            name="useroccupation"
            value={description || ''}
            placeholder="О себе"
            required=""
            minLength={2}
            maxLength={200}
            onChange={handleChangeDescription}
          />
          <span className="popup__error occupation-input-error" />
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
