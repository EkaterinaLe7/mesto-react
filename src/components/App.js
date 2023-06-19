import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
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
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile={ handleEditProfileClick }
          onAddPlace={ handleAddPlaceClick }
          onEditAvatar={ handleEditAvatarClick }
          onCardClick={ handleCardClick }
        />
        <Footer />
        <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          formName="infoform"
          buttonText="Сохранить"
          isOpen={ isEditProfilePopupOpen }
          onClose={ closeAllPopups }
          children={
            <>
              <label className="popup__label">
                <input
                  className="popup__input popup__input_content_name"
                  type="text"
                  id="name-input"
                  name="username"
                  placeholder="Имя"
                  required=""
                  minLength={2}
                  maxLength={40}
                />
                <span className="popup__error name-input-error" />
              </label>
              <label className="popup__label">
                <input
                  className="popup__input popup__input_content_occupation"
                  type="text"
                  id="occupation-input"
                  name="useroccupation"
                  placeholder="О себе"
                  required=""
                  minLength={2}
                  maxLength={200}
                />
                <span className="popup__error occupation-input-error" />
              </label>
            </>
          }
        />
        <PopupWithForm
          name="image-add"
          title="Новое место"
          formName="photocard"
          buttonText="Создать"
          isOpen={ isAddPlacePopupOpen }
          onClose={ closeAllPopups }
          children={
            <>
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
            </>
          }
        />
        <PopupWithForm
          name="avatar-edit"
          title="Обновить аватар"
          formName="avatarpopup"
          buttonText="Сохранить"
          isOpen={ isEditAvatarPopupOpen }
          onClose={ closeAllPopups }
          children={
            <>
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
            </>
          }
        />
        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          formName="comfirmpopup"
          buttonText="Да"
          onClose={ closeAllPopups }
        />
        <ImagePopup 
          onClose={ closeAllPopups }
          selectedCard={ selectedCard }
        />
      </div>
  </div>
  );
}

export default App;
