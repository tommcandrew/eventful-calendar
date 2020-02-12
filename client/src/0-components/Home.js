import React, { useContext } from "react";
import AuthContext from "../2-context/AuthContext";
import { Redirect, Link } from "react-router-dom";

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
          <h1 className="home__app-title">Eventful</h1>
          <h2 className="home__app-slogan">Live organised.</h2>
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

export default Home;
