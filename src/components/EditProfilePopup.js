import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({
      ...values,
      username: currentUser.name,
      useroccupation: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  // useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, isOpen]);

  // function handleChangeName(e) {
  //   setName(e.target.value);
  // }

  // function handleChangeDescription(e) {
  //   setDescription(e.target.value);
  // }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    // onUpdateUser({
    //   name,
    //   about: description,
    // });

    onUpdateUser({
      name: values.username,
      about: values.useroccupation,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      formName="infoform"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_name"
          type="text"
          id="name-input"
          name="username"
          // value={name || ""}
          value={values.username || ""}
          placeholder="Имя"
          required=""
          minLength={2}
          maxLength={40}
          // onChange={handleChangeName}
          onChange={handleChange}
        />
        <span className="popup__error name-input-error" />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_occupation"
          type="text"
          id="occupation-input"
          name="useroccupation"
          // value={description || ""}
          value={values.useroccupation || ""}
          placeholder="О себе"
          required=""
          minLength={2}
          maxLength={200}
          // onChange={handleChangeDescription}
          onChange={handleChange}
        />
        <span className="popup__error occupation-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
