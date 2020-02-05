import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ alert }) => {
  return (
    <div className="alert">
      <span>
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
      <p>{alert}</p>
    </div>
  );
};

export default Alert;
