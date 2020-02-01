import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { withRouter, Redirect, Link } from "react-router-dom";

const Home = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (authenticated) {
    return <Redirect to="/calendar" />;
  }

  return (
    <div className="home">
      <div className="home__content">
        <div className="home__header">
          <h1>Eventful</h1>
          <h2>Live organised.</h2>
        </div>
        <div className="home__buttons">
          <Link to="/login">
            <button className="home__button">Log in</button>
          </Link>
          <Link to="/register">
            <button className="home__button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
