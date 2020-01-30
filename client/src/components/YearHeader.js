import React, { useContext } from "react";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";
import gears from "../images/gears.svg";
import glass from "../images/glass.svg";

const YearHeader = ({ setYear, handleShowMyEvents, handleShowSettings }) => {
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`year-header ${
        theme === "Dark" ? "year-header--dark" : "year-header--light"
      }`}
    >
      <div className="year-header__links--left">
        <button onClick={handleShowMyEvents}>
          {" "}
          <img src={glass} alt="cocktail glass" title="My Events" />
        </button>
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
        <button
          onClick={handleShowSettings}
          className="year-header__settings-button"
        >
          <img src={gears} alt="settings" title="Settings" />
        </button>
      </div>
    </div>
  );
};

export default YearHeader;
