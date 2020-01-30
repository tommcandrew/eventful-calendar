import React, { useContext } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";

const ModalHeader = () => {
  const { dateObj } = useContext(DateContext);

  return (
    <div className="modal-header">
      <div className="modal-header__content">
        <span>{dateObj.date}</span>
        <span>{months[dateObj.month]}</span>
        <span>{dateObj.year}</span>
      </div>
    </div>
  );
};

export default ModalHeader;
