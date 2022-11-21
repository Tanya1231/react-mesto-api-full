import React from "react";
import logo from "../images/header__logo.svg";
import { Link, Route } from "react-router-dom";

function Header({ loggedIn, userEmail, onSignOut }) {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const menuButtonClassName = `menu__button ${
    isMenuOpened ? "menu__button-close" : "menu__button"
  }`;
  const menuClassName = `menu ${isMenuOpened && "menu_active"}`;
  const toggleButtonMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  return (
    <header className="header">
      {loggedIn ? (
        <>
          <div className="header__container">
            <img src={logo} className="header__logo" alt="Место Россия" />
            <button
              className={menuButtonClassName}
              onClick={toggleButtonMenu}
            ></button>
          </div>
          <nav className={menuClassName}>
            <p className="header__email">{userEmail}</p>
            <h2 onClick={onSignOut} className="header__link">
              Выйти
            </h2>
          </nav>
        </>
      ) : (
        <>
          <div className="header__container">
            <img src={logo} className="header__logo" alt="Место Россия" />
            <Route path="/signup">
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            </Route>
            <Route path="/signin">
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            </Route>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
