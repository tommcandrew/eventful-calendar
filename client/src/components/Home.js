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
    <div className="home-wrapper">
      <div className="home-content">
        <div className="home-header">
          <h1>Eventful</h1>
          <h2>Live organised.</h2>
        </div>
        <div className="home__buttons">
          <Link to="/login">
            <button className="button">Log in</button>
          </Link>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
