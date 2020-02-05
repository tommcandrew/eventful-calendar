import React, { useContext } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";
import LanguageContext from "../context/LanguageContext";
import DeviceContext from "../context/DeviceContext";
import { wholeYearTextOptions } from "../data/otherText";
import HeaderLinks from "./HeaderLinks";

const MonthHeader = ({
  monthIndex,
  yearView,
  setMonth,
  setShowWholeYear,
  handleShowSettings,
  handleShowMyEvents
}) => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);
  const { device } = useContext(DeviceContext);
  const monthsArray = months[language];
  if (yearView) {
    return (
      <div className="month-header">
        <div className="month-header__content">
          <button className="month-header__month-name">
            {monthsArray[monthIndex]}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="month-header">
        {device !== "mobile" && (
          <button
            className="month-header__whole-year-button"
            onClick={() => setShowWholeYear(true)}
          >
            &#11207;{wholeYearTextOptions[language]}
          </button>
        )}
        <div className="month-header__content">
          <button
            className="month-header__arrow--left"
            onClick={() => setMonth(monthIndex - 1)}
          >
            &#11207;
          </button>
          <div className="month-header__date-info">
            <button className="month-header__month-name">
              {monthsArray[monthIndex]}
            </button>
            <button className="month-header__year-name">{dateObj.year}</button>
          </div>

          <button
            className="month-header__arrow--right"
            onClick={() => setMonth(monthIndex + 1)}
          >
            &#11208;
          </button>
        </div>

        <HeaderLinks
          handleShowSettings={handleShowSettings}
          handleShowMyEvents={handleShowMyEvents}
        />
      </div>
    );
  }
};

export default MonthHeader;
