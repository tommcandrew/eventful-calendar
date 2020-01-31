import React, { useContext } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";
import LanguageContext from "../context/LanguageContext";
import gears from "../images/gears.svg";
import { seeWholeYearTextOptions } from "../data/otherText";

const MonthHeader = ({
  monthIndex,
  yearView,
  setMonth,
  setShowWholeYear,
  handleShowSettings
}) => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);
  const monthsArray = months[language];

  if (yearView) {
    return (
      <div className="month-header">
        <div className="month-header__content">
          <button className="month-name">{monthsArray[monthIndex]}</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="month-header">
        <button
          className="month-header__whole-year-button"
          onClick={() => setShowWholeYear(true)}
        >
          {seeWholeYearTextOptions[language]}
        </button>
        <div className="month-header__content">
          <button
            className="month-header__arrow--left"
            onClick={() => setMonth(monthIndex - 1)}
          >
            &#11207;
          </button>
          <div className="month-header__date-info">
            <button className="month-name">{monthsArray[monthIndex]}</button>
            <button className="year-name">{dateObj.year}</button>
          </div>

          <button
            className="month-header__arrow--right"
            onClick={() => setMonth(monthIndex + 1)}
          >
            &#11208;
          </button>
        </div>

        <div className="month-header__links--right">
          <button
            onClick={handleShowSettings}
            className="month-header__settings-button"
          >
            <img src={gears} alt="settings" title="Settings" />
          </button>
        </div>
      </div>
    );
  }
};

export default MonthHeader;
