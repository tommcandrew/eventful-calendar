import React, { useContext, useEffect } from "react";
import AuthContext from "../2-context/AuthContext";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const { login, errorMessage, setErrorMessage, authenticated } = useContext(
    AuthContext
  );
  const handleLogin = e => {
    e.preventDefault();
    login(e);
  };

  useEffect(() => {
    setErrorMessage();
    //eslint-disable-next-line
  }, []);

  if (authenticated) {
    return <Redirect to="/calendar" />;
  }

  return (
    <div className="loginRegister">
      <div className="loginRegister__header">
        <Link to="/">
          <h1 className="loginRegister__app-title">Eventful</h1>
        </Link>
      </div>
      <div className="loginRegister__content">
        <h2 className="loginRegister__form-title">Log in</h2>
        <form onSubmit={e => handleLogin(e)} className="loginRegister__form">
          <input type="email" name="email" placeholder="Your email" />
          <input type="password" name="password" placeholder="Your password" />
          <div className="loginRegister__error-message">{errorMessage}</div>
          <button type="submit" className="button loginRegister__button">
            Log in
          </button>
        </form>
        <div className="loginRegister__link-container">
          <p>No account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
