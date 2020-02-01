import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { withRouter } from "react-router-dom";

const MyAccount = withRouter(({ history }) => {
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("my-token");
    history.push("/");
  };
  const { userName, userEmail, setAuthenticated } = useContext(AuthContext);
  return (
    <div className="my-account">
      <div className="my-account__profile-pic">{userName.substr(0, 1)}</div>
      <div className="my-account__user-details">
        <h3>{userName}</h3>
        <p>{userEmail}</p>
      </div>
      <button className="button button--logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
});

export default withRouter(MyAccount);
