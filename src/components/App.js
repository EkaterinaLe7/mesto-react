import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // const [isSubmited, setisSubmited] = useState(false);

  useEffect(() => {
    // api
    //   .getUserInfo()
    //   .then((res) => {
    //     setUserName(res.name);
    //     setUserDescription(res.about);
    //     setUserAvatar(res.avatar);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike({likes, id}) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
  
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardDelete({id}) {
  api.deliteCard(id)
  .then(() => {
    setCards((cards) => cards.filter((c) => c._id !== id))
    // poupDeleteCard.closePopup()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleUpdateUser(data) {
  api.setUserInfo(data)
  .then((res) => {
    setCurrentUser(res);
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleUpdateAvatar(data) {
  api.editAvatar(data)
  .then((res) => {
    setCurrentUser(res);
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleAddPlaceSubmit(data) {
  api.createCard(data)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
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
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAddPlaceSubmit} />
          {/* <PopupWithForm
            name="image-add"
            title="Новое место"
            formName="photocard"
            buttonText="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__input popup__input_content_title"
                type="text"
                id="title-input"
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
                name="imagelink"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="popup__error link-input-error" />
            </label>
          </PopupWithForm> */}
          {/* <PopupWithForm
            name="avatar-edit"
            title="Обновить аватар"
            formName="avatarpopup"
            buttonText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__input popup__input_content_image"
                type="url"
                id="avatar-input"
                name="avatarlink"
                placeholder="Ссылка на изображение"
                required=""
              />
              <span className="popup__error avatar-input-error" />
            </label>
          </PopupWithForm> */}
          <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            formName="comfirmpopup"
            buttonText="Да"
            onClose={closeAllPopups}
          />
          <ImagePopup onClose={closeAllPopups} selectedCard={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
