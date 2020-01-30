import React, { useContext } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";

const MonthHeader = ({ monthIndex, yearView, setMonth, setShowWholeYear }) => {
  const { dateObj } = useContext(DateContext);

  if (yearView) {
    return (
      <div className="month-header">
        <div className="month-header__content">
          <button className="month-name">{months[monthIndex]}</button>
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
          See Whole Year
        </button>
        <div className="month-header__content">
          <button
            className="month-header__arrow--left"
            onClick={() => setMonth(monthIndex - 1)}
          >
            &#11207;
          </button>
          <div className="month-header__date-info">
            <button className="month-name">{months[monthIndex]}</button>
            <button className="year-name">{dateObj.year}</button>
          </div>

          <button
            className="month-header__arrow--right"
            onClick={() => setMonth(monthIndex + 1)}
          >
            &#11208;
          </button>
        </div>
      </div>
    );
  }
};

export default MonthHeader;
