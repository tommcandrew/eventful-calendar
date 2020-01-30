import React, { useContext } from "react";
import DateContext from "../context/DateContext";

const YearHeader = ({ setYear, handleShowMyEvents }) => {
  const { dateObj } = useContext(DateContext);

  return (
    <div className="year-header">
      <div className="year-header__links">
        <button onClick={handleShowMyEvents}>My Events</button>
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
