import React from 'react';

function Card({ name, link, likes, onCardClick }) {
  function handleClick() {
    onCardClick({ name, link })
  }
    return (
        <li className="photo-item" onClick={ handleClick }>
                <button className="photo-item__delete-btn" type="button" />
                <img className="photo-item__img"
                src={ link }
                alt={ name } />
                <div className="photo-item__description">
                  <h2 className="photo-item__title">{ name }</h2>
                  <div className="photo-item__counter-wrapper">
                    <button className="photo-item__like-btn" type="button" />
                    <span className="photo-item__like-counter">{ likes.length }</span>
                  </div>
                </div>
              </li>
    )
}

export default Card;