import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = ({ history }) => {
  const { authenticated, login, register, loading } = useContext(AuthContext);
  const handleLogin = e => {
    e.preventDefault();
    login(e, () => {
      history.push("/calendar");
    });
  };

  const handleRegister = e => {
    e.preventDefault();
    register(e, () => {
      history.push("/calendar");
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!authenticated) {
    return (
      <div className="home-wrapper">
        <div className="home-header">
          <h1>Eventful</h1>
          <h2>Live organised.</h2>
        </div>
        <div className="home-content">
          <div>
            <h2>Login</h2>
            <form onSubmit={(e, props) => handleLogin(e)}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            <h2>Register</h2>
            <form onSubmit={(e, props) => handleRegister(e)}>
              <label htmlFor="emailx">Email</label>
              <input type="email" id="emailx" name="email" />
              <label htmlFor="passwordx">Password</label>
              <input type="password" id="passwordx" name="password" />
              <label htmlFor="password2x">Password 2</label>
              <input type="password" id="password2x" name="password2" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/calendar" />;
  }
};

export default withRouter(Home);
