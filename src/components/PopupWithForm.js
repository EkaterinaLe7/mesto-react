import React, { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  formName,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function closePopupsByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closePopupsByEsc);

    return () => document.removeEventListener("keydown", closePopupsByEsc);
  }, [isOpen, onClose]);

  function closePopupByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={closePopupByOverlay}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          method="post"
          name={formName}
          noValidate=""
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button" type="submit">
            {`${isLoading ? "Сохранение..." : buttonText}`}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
