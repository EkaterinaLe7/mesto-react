import React from "react";

function PopupWithForm({
  name,
  title,
  formName,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
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
            {buttonText}
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
