import React from 'react';

function PopupWithForm({name, title, formName, children, buttonText}) {
    return (
        <div className={`popup popup_type_${name}`}>
          <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form
              className="popup__form"
              method="post"
              name={formName}
              noValidate=""
            >
              {children}
              <button className="popup__button" type="submit">
                {buttonText}
              </button>
            </form>
            <button className="popup__button-close" type="button" />
          </div>
        </div>
    )
}

export default PopupWithForm ;