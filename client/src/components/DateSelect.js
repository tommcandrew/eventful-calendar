import React from "react";
import months from "../data/months";

const d = new Date();

const currentYear = d.getFullYear();

const yearList = [];

for (let i = currentYear; i >= currentYear - 100; i--) {
  yearList.push(i);
}

const DateSelect = ({ handleSelectYear, handleSelectMonth }) => {
  return (
    <div className="date-select__wrapper">
      <ul className="date-select__month-list">
        {months.English.map((month, index) => (
          <li onClick={() => handleSelectMonth(index)}>{month}</li>
        ))}
      </ul>
      <ul className="date-select__year-list">
        {yearList.map(year => (
          <li onClick={handleSelectYear}>{year}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateSelect;
