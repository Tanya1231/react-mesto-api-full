import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardRemove,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватар"
        />
        <button
          className="profile__avatar-edit"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__addbutton"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <div className="elements" id="card">
        {cards.map(card => {
          return (
            <Card
              key={card._id}
              likesCount={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardRemove={onCardRemove}
              name={card.name}
              link={card.link}
              card={card}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Main;
