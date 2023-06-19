// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// import api from '../utils/api'

// function handleEditAvatarClick() {
//   document.querySelector('.popup_type_avatar-edit').classList.add('popup_opened');
// }

// function handleEditProfileClick() {
//   document.querySelector('.popup_type_profile-edit').classList.add('popup_opened');
// }

// function handleAddPlaceClick() {
//   document.querySelector('.popup_type_image-add').classList.add('popup_opened');
// }

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    // setIsImagePopupOpen(!isImagePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          formName="infoform"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
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
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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
          onClose={closeAllPopups}
        />
        <ImagePopup 
          onClose={closeAllPopups}
          // isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
        />

        {/* <div className="popup popup_type_profile-edit">
          <div className="popup__container">
            <h2 className="popup__title">Редактировать профиль</h2>
            <form
              className="popup__form"
              method="post"
              name="infoform"
              noValidate=""
            >
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
              <button className="popup__button" type="submit">
                Сохранить
              </button>
            </form>
            <button className="popup__button-close" type="button" />
          </div>
        </div> */}
        {/* <div className="popup popup_type_image-add">
          <div className="popup__container">
            <h2 className="popup__title">Новое место</h2>
            <form
              className="popup__form"
              method="post"
              name="photocard"
              noValidate=""
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
              <button className="popup__button" type="submit">
                Создать
              </button>
            </form>
            <button className="popup__button-close" type="button" />
          </div>
        </div> */}
        {/* <div className="popup popup_type_card-opened">
          <div className="popup__card-container">
            <figure className="popup__figure">
              <img className="popup__image" src="#" alt="#" />
              <figcaption className="popup__figcaption" />
            </figure>
            <button className="popup__button-close" />
          </div>
        </div> */}
        {/* <div className="popup popup_type_avatar-edit">
          <div className="popup__container">
            <h2 className="popup__title">Обновить аватар</h2>
            <form
              className="popup__form"
              method="post"
              name="avatarpopup"
              noValidate=""
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
              <button className="popup__button" type="submit">
                Сохранить
              </button>
            </form>
            <button className="popup__button-close" type="button" />
          </div>
        </div> */}
        {/* <div className="popup popup_type_confirm-delete">
          <div className="popup__container">
            <h2 className="popup__title">Вы уверены?</h2>
            <form
              className="popup__form"
              method="post"
              name="comfirmpopup"
              noValidate=""
            >
              <button className="popup__button" type="submit">
                Да
              </button>
            </form>
            <button className="popup__button-close" type="button" />
          </div>
        </div> */}
        <template className="photo-template" />
      </div>
  </div>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

  );
}

export default App;
