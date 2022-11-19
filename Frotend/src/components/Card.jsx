import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  link,
  name,
  likesCount,
  onCardClick,
  onCardLike,
  onCardRemove,
  card,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardLikeButtonClassName = isLiked
    ? "element__vector element__vector_active"
    : "element__vector";
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={() => onCardRemove(card)}
      ></button>
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__mask-group">
        <h2 className="element__title">{name}</h2>
        <div className="element__vector_container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <span className="element__vector-counter">{likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
