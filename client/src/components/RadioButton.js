import React from "react";

const RadioButton = props => {
  return (
    <div
      className="radio-button__wrapper"
      onClick={() => props.handler(props.index)}
    >
      <span>{props.text}</span>
      <div
        className={`radio-button__button ${
          props.isChecked
            ? "radio-button__button--checked"
            : "radio-button__button--unchecked"
        }`}
      ></div>
    </div>
  );
};

export default RadioButton;
