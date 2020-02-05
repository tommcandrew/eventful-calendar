import React, { useContext } from "react";
import {
  myEventsTextOptions,
  settingsTextOptions,
  myAccountTextOptions
} from "../data/otherText";

import LanguageContext from "../context/LanguageContext";

const MobileMenu = ({
  setShowMenu,
  handleShowSettings,
  handleShowMyEvents,
  setShowMyAccount
}) => {
  const { language } = useContext(LanguageContext);

  const handleClickSettings = () => {
    setShowMenu(false);
    handleShowSettings();
  };

  const handleClickMyEvents = () => {
    setShowMenu(false);
    handleShowMyEvents();
  };

  const handleClickMyAccount = () => {
    setShowMenu(false);
    setShowMyAccount(true);
  };

  return (
    <div className="mobile-menu">
      <span
        className="mobile-menu__close-button"
        onClick={() => setShowMenu(false)}
      >
        &times;
      </span>

      <div className="mobile-menu__links">
        <div
          className="mobile-menu__my-events-button"
          onClick={handleClickMyEvents}
        >
          {myEventsTextOptions[language]}
        </div>
        <div
          className="mobile-menu__my-account-button"
          onClick={handleClickMyAccount}
        >
          {myAccountTextOptions[language]}
        </div>
        <div
          className="mobile-menu__settings-button"
          onClick={handleClickSettings}
        >
          {settingsTextOptions[language]}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
