import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ selectedCard }) {
  const app = useContext(AppContext);

  // useEffect(() => {
    // if (!selectedCard) return;

    // function closePopupsByEsc(e) {
    //   if (e.key === "Escape") {
    //     app.closeAllPopups();
    //   }
    // }

    // document.addEventListener("keydown", closePopupsByEsc);

    // return () => document.removeEventListener("keydown", closePopupsByEsc);

   

  // }, [selectedCard, app, app.closeAllPopups]);

  // function closePopupByOverlay(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     app.closeAllPopups();
  //   }
  // }

  usePopupClose(selectedCard?.link, app.closeAllPopups)

  return (
    <div
      className={`popup popup_type_card-opened ${
        selectedCard && "popup_opened"
      }`}
      // onClick={closePopupByOverlay}
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
        <button className="popup__button-close" onClick={app.closeAllPopups} />
      </div>
    </div>
  );
}

export default ImagePopup;
