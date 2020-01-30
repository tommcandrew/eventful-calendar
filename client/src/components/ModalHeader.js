import React, { useContext } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";
import LanguageContext from "../context/LanguageContext";

const ModalHeader = () => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);

  const monthsArray = months[language];

  return (
    <div className="modal-header">
      <div className="modal-header__content">
        <span>{dateObj.date}</span>
        <span>{monthsArray[dateObj.month]}</span>
        <span>{dateObj.year}</span>
      </div>
    </div>
  );
};

export default ModalHeader;
