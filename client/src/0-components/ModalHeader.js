import React, { useContext } from "react";
import DateContext from "../2-context/DateContext";
import LanguageContext from "../2-context/LanguageContext";
import months from "../3-data/months";
import weekdays from "../3-data/weekdays";

const ModalHeader = () => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);

  const monthsArray = months[language];

  //because Sunday's index is 0 by default
  let weekdayIndex;
  if (dateObj.dayIndex - 1 !== -1) {
    weekdayIndex = dateObj.dayIndex - 1;
  } else {
    weekdayIndex = 6;
  }

  return (
    <div className="modal-header">
      <div className="modal-header__content">
        <span className="modal-header__weekday">
          {weekdays[language].long[weekdayIndex]}
        </span>
        <div className="modal-header__date-info">
          <span className="modal-header__date">{dateObj.date}</span>
          <span className="modal-header__month">
            {monthsArray[dateObj.month]}
          </span>
          <span className="modal-header__year">{dateObj.year}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
