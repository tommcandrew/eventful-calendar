import React, { useContext } from "react";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";
import HeaderLinks from "./HeaderLinks";

const YearHeader = ({
  setYear,
  handleShowMyEvents,
  handleShowSettings,
  showMyAccount,
  setShowMyAccount
}) => {
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`year-header ${
        theme === "Dark" ? "year-header--dark" : "year-header--light"
      }`}
    >
      <div className="year-header__links--left">
        <h1 className="year-header__app-name">Eventful</h1>
      </div>
      <div className="year-header__content">
        <button
          className="year-header__arrow year-header__arrow--left"
          onClick={() => setYear(dateObj.year - 1)}
        ></button>
        <button className="year-header__title">{dateObj.year}</button>
        <button
          className="year-header__arrow year-header__arrow--right"
          onClick={() => setYear(dateObj.year + 1)}
        ></button>
      </div>
      <HeaderLinks
        handleShowMyEvents={handleShowMyEvents}
        handleShowSettings={handleShowSettings}
        showMyAccount={showMyAccount}
        setShowMyAccount={setShowMyAccount}
      />
    </div>
  );
};

export default YearHeader;
