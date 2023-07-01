import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationDeletePopup from "./ConfirmationDeletePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoadiing] = useState(false);
  const [selectedDeletCard, setSelectedDeletCard] = useState(null);

  useEffect(() => {
    api
      .getAppInfo()
      .then(([cardsArray, userData]) => {
        setCards(cardsArray);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike({ likes, id }) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete({ id }) {
    setIsLoadiing(true);

    api
      .deliteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadiing(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoadiing(true);

    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadiing(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadiing(true);

    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadiing(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadiing(true);

    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadiing(false);
      });
  }

  function handleConfirmationDelete(card) {
    setSelectedDeletCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedDeletCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onConfirmationDelete={handleConfirmationDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmationDeletePopup
            card={selectedDeletCard}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup onClose={closeAllPopups} selectedCard={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
