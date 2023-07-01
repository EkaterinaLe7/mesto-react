import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  name,
  title,
  formName,
  children,
  buttonText,
  isOpen,
  onSubmit,
}) {
  const app = useContext(AppContext);

  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          method="post"
          name={formName}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button" type="submit">
            {`${app.isLoading ? "Сохранение..." : buttonText}`}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          onClick={app.closeAllPopups}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
