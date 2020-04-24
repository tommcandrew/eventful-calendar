import React, { useContext } from "react";
import AuthContext from "../2-context/AuthContext";
import LanguageContext from "../2-context/LanguageContext";
import { logOutTextOptions } from "../3-data/siteText";
import { Redirect } from "react-router-dom";
import axios from "axios";

const MyAccount = ({ setShowMyAccount }) => {
  const { language } = useContext(LanguageContext);
  const { userName, userEmail, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    if (userEmail === "demouser@gmail.com") {
      axios.delete("/api/removeDemoEvents");
    }
    setAuthenticated(false);
    localStorage.removeItem("my-token");
    return <Redirect to="/" />;
  };

  return (
    <div className="my-account">
      <span
        className="my-account__close-button"
        onClick={() => setShowMyAccount(false)}
      >
        &times;
      </span>
      <div className="my-account__profile-pic">
        <span className="my-account__user-initial">
          {userName.substr(0, 1)}
        </span>
      </div>
      <div className="my-account__user-details">
        <h3 className="my-account__user-name">{userName}</h3>
        <p className="my-account__user-email">{userEmail}</p>
      </div>
      <button className="my-account__logout" onClick={handleLogout}>
        {logOutTextOptions[language]}
      </button>
    </div>
  );
};

export default MyAccount;
