import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { login, errorMessage, setErrorMessage } = useContext(AuthContext);
  const handleLogin = async e => {
    e.preventDefault();
    login(e, () => {
      history.push("/calendar");
    });
  };

  useEffect(() => {
    setErrorMessage();
  }, []);

  return (
    <div className="loginRegister">
      <div className="loginRegister__header">
        <Link to="/">
          <h1>Eventful</h1>
        </Link>
      </div>
      <div className="loginRegister__content">
        <h2>Log in</h2>
        <form onSubmit={e => handleLogin(e)}>
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
