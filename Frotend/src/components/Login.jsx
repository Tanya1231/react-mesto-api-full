import React from "react";

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = inputs;
    if (onLogin && email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div onSubmit={handleSubmit} className="form form_type_auth">
      <h2 className="popup__heading popup__heading_auth">Вход</h2>
      <form className="form form__popup">
        <input
          className="form__container form__container_auth"
          id="email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <p className="form__error" id="email-error" />
        <input
          className="form__container form__container_auth"
          id="password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <p className="form__error" id="email-error" />
        <button type="submit" className="form__button form__button_auth">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
