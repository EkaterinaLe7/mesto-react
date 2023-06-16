import React from 'react';
import api from '../utils/api';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  const [ userName, setUserName ] = React.useState();
  const [ userDescription , setUserDescription ] = React.useState();
  const [ userAvatar, setUserAvatar ] = React.useState();
  const [ cards, setCards ] = React.useState([]);

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
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        console.log(res);
        setCards(res);
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
            <ul className="elements__photo-items">
              {cards.map((card) => (
                <li className="photo-item" key={card._id}>
                <button className="photo-item__delete-btn" type="button" />
                <img className="photo-item__img"
                src={card.link}
                alt={card.name} />
                <div className="photo-item__description">
                  <h2 className="photo-item__title">{card.name}</h2>
                  <div className="photo-item__counter-wrapper">
                    <button className="photo-item__like-btn" type="button" />
                    <span className="photo-item__like-counter">{card.likes.length}</span>
                  </div>
                </div>
              </li>
              ))}
              
            </ul>
          </section>
        </main>
    )
}

export default Main;