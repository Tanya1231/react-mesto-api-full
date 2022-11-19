import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = state;
    if (onRegister && email && password) {
      onRegister(email, password);
    }
  };
  return (
    <div className="form form_type_auth">
      <h2 className="popup__heading popup__heading_auth">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form form__popup">
        <input
          className="form__container form__container_auth"
          id="email"
          required
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <p className="form__error" id="email-error" />
        <input
          className="form__container form__container_auth"
          id="password"
          required
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <p className="form__error" id="email-error" />
        <button
          type="submit"
          className="form__button form__button_auth"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
        <p className="popup__text">
          Уже зарегистрировались?
          <Link className="popup__text-link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
