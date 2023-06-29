import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <>
      <PopupWithForm
        name="image-add"
        title="Новое место"
        formName="photocard"
        buttonText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_content_title"
            type="text"
            id="title-input"
            ref={nameRef}
            name="photoname"
            placeholder="Название"
            required=""
            minLength={2}
            maxLength={30}
          />
          <span className="popup__error title-input-error" />
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_content_image"
            type="url"
            id="link-input"
            ref={linkRef}
            name="imagelink"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="popup__error link-input-error" />
        </label>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
