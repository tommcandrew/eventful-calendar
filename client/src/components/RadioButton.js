import React from "react";

const RadioButton = props => {
  return (
    <div
      className="radio-button-wrapper"
      onClick={() => props.handler(props.index)}
    >
      <span>{props.text}</span>
      <div
        className={
          props.isChecked ? "radio-button checked" : "radio-button unchecked"
        }
      ></div>
    </div>
  );
};

export default RadioButton;
