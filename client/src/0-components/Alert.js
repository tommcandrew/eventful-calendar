import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ alertText }) => {
  return (
    <div className="alert">
      <span className="alert__icon-wrapper">
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
      <p className="alert__text">{alertText}</p>
    </div>
  );
};

export default Alert;
