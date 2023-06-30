import React, { useEffect } from "react";

function ImagePopup({ selectedCard, onClose }) {
  useEffect(() => {
    if (!selectedCard) return;

    function closePopupsByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closePopupsByEsc);

    return () => document.removeEventListener("keydown", closePopupsByEsc);
  }, [selectedCard, onClose]);

  function closePopupByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_card-opened ${
        selectedCard && "popup_opened"
      }`}
      onClick={closePopupByOverlay}
    >
      <div className="popup__card-container">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={selectedCard && selectedCard.link}
            alt={selectedCard && selectedCard.name}
          />
          <figcaption className="popup__figcaption">
            {selectedCard && selectedCard.name}
          </figcaption>
        </figure>
        <button className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;
