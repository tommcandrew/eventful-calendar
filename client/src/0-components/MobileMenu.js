import React, { useContext } from "react";
import LanguageContext from "../2-context/LanguageContext";
import {
  myEventsTextOptions,
  settingsTextOptions,
  myAccountTextOptions
} from "../3-data/siteText";

const MobileMenu = ({
  handleShowMyEvents,
  handleShowSettings,
  setShowMenu,
  setShowMyAccount
}) => {
  const { language } = useContext(LanguageContext);

  const handleClickMyAccount = () => {
    setShowMenu(false);
    setShowMyAccount(true);
  };

  const handleClickMyEvents = () => {
    setShowMenu(false);
    handleShowMyEvents();
  };

  const handleClickSettings = () => {
    setShowMenu(false);
    handleShowSettings();
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
