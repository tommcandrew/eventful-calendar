import React, { useContext } from "react";
import {
  myEventsTextOptions,
  settingsTextOptions,
  myAccountTextOptions,
  printTextOptions
} from "../data/otherText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGlassMartiniAlt,
  faCog,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import LanguageContext from "../context/LanguageContext";

const HeaderLinks = ({
  handleShowMyEvents,
  handleShowSettings,
  showMyAccount,
  setShowMyAccount
}) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="header-links">
      <div className="header-links__my-account-button">
        <FontAwesomeIcon
          icon={faUserCircle}
          title={myAccountTextOptions[language]}
          onClick={() => setShowMyAccount(!showMyAccount)}
        />
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
      <div
        onClick={() => window.print()}
        className="header-links__printer-button"
      >
        <FontAwesomeIcon icon={faPrint} title={printTextOptions[language]} />
      </div>
    </div>
  );
};

export default HeaderLinks;
