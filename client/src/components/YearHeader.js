import React, { useContext } from "react";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";

const YearHeader = ({ setYear, handleShowMyEvents, handleShowSettings }) => {
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`year-header ${
        theme === "Dark" ? "year-header--dark" : "year-header--light"
      }`}
    >
      <div className="year-header__links">
        <button onClick={handleShowMyEvents}>My Events</button>
        <button onClick={handleShowSettings}>Settings</button>
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
    </div>
  );
};

export default YearHeader;
