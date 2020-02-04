import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { register, errorMessage, setErrorMessage } = useContext(AuthContext);

  //using custom validation because I want to check that passwords match and don't want to use mix of validation types (i.e. custom and HTML5)

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [nameInputClassName, setNameInputClassName] = useState("");
  const [emailInputClassName, setEmailInputClassName] = useState("");
  const [passwordInputClassName, setPasswordInputClassName] = useState("");
  const [
    confirmPasswordInputClassName,
    setConfirmPasswordInputClassName
  ] = useState("");

  useEffect(() => {
    setErrorMessage();
  }, []);

  const handleNameInput = e => {
    const text = e.target.value;
    setNameInput(text);
    if (text.length > 0) {
      setNameInputClassName("valid");
    } else {
      setNameInputClassName("invalid");
    }
  };

  const handleEmailInput = e => {
    const text = e.target.value;
    setEmailInput(text);
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(text)) {
      setEmailInputClassName("valid");
    } else {
      setEmailInputClassName("invalid");
    }
  };

  const handlePasswordInput = e => {
    const text = e.target.value;
    setPasswordInput(text);
    if (text.length < 8) {
      setPasswordInputClassName("invalid");
    } else {
      setPasswordInputClassName("valid");
    }
  };

  const handleConfirmPasswordInput = e => {
    const text = e.target.value;
    setConfirmPasswordInput(text);
    if (text.length > 7 && text === passwordInput) {
      setConfirmPasswordInputClassName("valid");
    } else {
      setConfirmPasswordInputClassName("invalid");
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    register(e, () => {
      history.push("/calendar");
    });
  };
  return (
    <div className="loginRegister">
      <div className="loginRegister__header">
        <Link to="/">
          <h1>Eventful</h1>
        </Link>
      </div>
      <div className="loginRegister__content">
        <h2>Register</h2>
        <form onSubmit={e => handleRegister(e)}>
          <input
            required
            type="text"
            name="name"
            placeholder="First Name"
            onChange={handleNameInput}
            value={nameInput}
            className={nameInputClassName}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmailInput}
            value={emailInput}
            className={emailInputClassName}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            minLength="8"
            onChange={handlePasswordInput}
            value={passwordInput}
            className={passwordInputClassName}
          />
          <input
            required
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordInput}
            value={confirmPasswordInput}
            className={confirmPasswordInputClassName}
          />
          <div className="loginRegister__error-message">{errorMessage}</div>
          <button type="submit" className="button loginRegister__button">
            Register
          </button>
        </form>
        <div className="loginRegister__link-container">
          <p>Have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
