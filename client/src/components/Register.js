import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { register } = useContext(AuthContext);

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
          <input type="text" name="name" placeholder="First Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
          />
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
