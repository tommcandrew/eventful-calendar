import React, { useContext, useState } from "react";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
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

const YearHeader = ({ setYear, handleShowMyEvents, handleShowSettings }) => {
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [showMyAccount, setShowMyAccount] = useState(false);

  return (
    <div
      className={`year-header ${
        theme === "Dark" ? "year-header--dark" : "year-header--light"
      }`}
    >
      <div className="year-header__links--left">
        <h1>Eventful</h1>
      </div>
      <div className="year-header__content">
        <button
          className="year-header__arrow"
          onClick={() => setYear(dateObj.year - 1)}
        >
          &#11207;
        </button>
        <button className="year-header__title">{dateObj.year}</button>
        <button
          className="year-header__arrow"
          onClick={() => setYear(dateObj.year + 1)}
        >
          &#11208;
        </button>
      </div>
      <div className="year-header__links--right">
        <div className="year-header__my-account-button">
          <FontAwesomeIcon
            icon={faUserCircle}
            title={myAccountTextOptions[language]}
            onClick={() => setShowMyAccount(!showMyAccount)}
          />
          {showMyAccount && <MyAccount />}
        </div>
        <div
          onClick={handleShowMyEvents}
          className="year-header__my-events-button"
        >
          <FontAwesomeIcon
            icon={faGlassMartiniAlt}
            title={myEventsTextOptions[language]}
          />
        </div>
        <div
          onClick={handleShowSettings}
          className="year-header__settings-button"
        >
          <FontAwesomeIcon icon={faCog} title={settingsTextOptions[language]} />
        </div>
      </div>
    </div>
  );
};

export default YearHeader;
