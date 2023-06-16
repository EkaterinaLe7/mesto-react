import React from 'react';
import api from '../utils/api';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  const [ userName, setUserName ] = React.useState();
  const [ userDescription , setUserDescription ] = React.useState();
  const [ userAvatar, setUserAvatar ] = React.useState();

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar)
      })
      .catch((err) => {
        console.log(err);
      })
  })

    return (
        <main className="content page__container-centered">
          <section className="profile">
            <div className="profile__avatar"
            onClick={ onEditAvatar }
            style={{ backgroundImage: `url(${userAvatar})` }}/>
            <div className="profile__info">
              <div className="profile__wrapper">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-button" type="button" onClick={ onEditProfile }/>
              </div>
              <p className="profile__occupation">{userDescription}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={ onAddPlace }/>
          </section>
          <section className="elements" aria-label="Фотографии">
            <ul className="elements__photo-items"></ul>
          </section>
        </main>
    )
}

export default Main;