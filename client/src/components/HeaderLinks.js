import React, { useState, useContext } from "react";
import MyAccount from "./MyAccount";
import {
  myEventsTextOptions,
  settingsTextOptions,
  myAccountTextOptions
} from "../data/otherText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGlassMartiniAlt,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import LanguageContext from "../context/LanguageContext";

const HeaderLinks = ({ handleShowMyEvents, handleShowSettings }) => {
  const { language } = useContext(LanguageContext);
  const [showMyAccount, setShowMyAccount] = useState(false);
  return (
    <div className="header-links">
      <div className="header-links__my-account-button">
        <FontAwesomeIcon
          icon={faUserCircle}
          title={myAccountTextOptions[language]}
          onClick={() => setShowMyAccount(!showMyAccount)}
        />
        {showMyAccount && <MyAccount />}
      </div>
      <div
        onClick={handleShowMyEvents}
        className="header-links__my-events-button"
      >
        <FontAwesomeIcon
          icon={faGlassMartiniAlt}
          title={myEventsTextOptions[language]}
        />
      </div>
      <div
        onClick={handleShowSettings}
        className="header-links__settings-button"
      >
        <FontAwesomeIcon icon={faCog} title={settingsTextOptions[language]} />
      </div>
    </div>
  );
};

export default HeaderLinks;
