import React, { useContext } from "react";
import months from "../3-data/months";
import LanguageContext from "../2-context/LanguageContext";

//create list from current year going back 100 years
const d = new Date();
const currentYear = d.getFullYear();
const yearList = [];
for (let i = currentYear; i >= currentYear - 100; i--) {
  yearList.push(i);
}

const DateSelect = ({ setMonth, setYear }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="date-select">
      <ul className="date-select__month-list">
        {months[language].map((month, index) => (
          <li key={"month" + index} onClick={() => setMonth(index)}>
            {month}
          </li>
        ))}
      </ul>
      <ul className="date-select__year-list">
        {yearList.map((year, index) => (
          <li key={"year" + index} onClick={e => setYear(e.target.innerText)}>
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateSelect;
