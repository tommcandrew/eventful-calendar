import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { withRouter } from "react-router-dom";
import DeviceContext from "../context/DeviceContext";
import { logOutTextOptions } from "../data/otherText";
import LanguageContext from "../context/LanguageContext";

const MyAccount = withRouter(({ history, setShowMyAccount }) => {
  const { language } = useContext(LanguageContext);
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("my-token");
    history.push("/");
  };
  const { device } = useContext(DeviceContext);
  const { userName, userEmail, setAuthenticated } = useContext(AuthContext);
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
        <h3>{userName}</h3>
        <p>{userEmail}</p>
      </div>
      <button className="my-account__logout" onClick={handleLogout}>
        {logOutTextOptions[language]}
      </button>
    </div>
  );
});

export default withRouter(MyAccount);
