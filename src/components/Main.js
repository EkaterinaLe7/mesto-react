import React from 'react';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
    return (
        <main className="content page__container-centered">
          <section className="profile">
            <div className="profile__avatar" onClick={onEditAvatar}/>
            <div className="profile__info">
              <div className="profile__wrapper">
                <h1 className="profile__name">Custo</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
              </div>
              <p className="profile__occupation">t</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}/>
          </section>
          <section className="elements" aria-label="Фотографии">
            <ul className="elements__photo-items"></ul>
          </section>
        </main>
    )
}

export default Main;