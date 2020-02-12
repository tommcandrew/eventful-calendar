import React, { useContext } from "react";
import LanguageContext from "../2-context/LanguageContext";
import {
  myEventsTextOptions,
  settingsTextOptions,
  myAccountTextOptions,
  printTextOptions
} from "../3-data/otherText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGlassMartiniAlt,
  faCog,
  faPrint
} from "@fortawesome/free-solid-svg-icons";

const HeaderLinks = ({
  handleShowMyEvents,
  handleShowSettings,
  setShowMyAccount,
  showMyAccount
}) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="header-links">
      <div className="header-links__my-account-button">
        <FontAwesomeIcon
          icon={faUserCircle}
          onClick={() => setShowMyAccount(!showMyAccount)}
          title={myAccountTextOptions[language]}
        />
      </div>
      <div
        className="header-links__my-events-button"
        onClick={handleShowMyEvents}
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
