import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const handleLogin = e => {
    e.preventDefault();
    login(e, () => {
      history.push("/calendar");
    });
  };

  return (
    <div className="login">
      <div className="login__header">
        <Link to="/">
          <h1>Eventful</h1>
        </Link>
      </div>
      <div className="login__content">
        <h2>Log in</h2>
        <form onSubmit={e => handleLogin(e)}>
          <input type="email" name="email" placeholder="Your email" />
          <input type="password" name="password" placeholder="Your password" />
          <button type="submit" className="button">
            Log in
          </button>
        </form>
        <div className="login__register-link">
          <p>No account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
