import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="image-add"
      title="Новое место"
      formName="photocard"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_title"
          type="text"
          id="title-input"
          value={name || ""}
          name="photoname"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          onChange={handleChangeName}
        />
        <span className="popup__error title-input-error" />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_image"
          type="url"
          id="link-input"
          value={link || ""}
          name="imagelink"
          placeholder="Ссылка на картинку"
          required=""
          onChange={handleChangeLink}
        />
        <span className="popup__error link-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
