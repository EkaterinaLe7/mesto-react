import React from "react";
import Card from "./Card";
// import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");
  // const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  // React.useEffect(() => {
  //   // api
  //   //   .getUserInfo()
  //   //   .then((res) => {
  //   //     setUserName(res.name);
  //   //     setUserDescription(res.about);
  //   //     setUserAvatar(res.avatar);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   api
  //     .getInitialCards()
  //     .then((res) => {
  //       setCards(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <main className="content page__container-centered">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Фотографии">
        <ul className="elements__photo-items">
          {cards.map((card) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              owner={card.owner}
              id={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
