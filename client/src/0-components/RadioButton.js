import React from "react";

const RadioButton = ({ index, handler, label, isChecked, category }) => {
  return (
    <div className="radio-button" onClick={() => handler(index, category)}>
      <span className="radio-button__label">{label}</span>
      <div
        className={`radio-button__button ${
          isChecked
            ? "radio-button__button--checked"
            : "radio-button__button--unchecked"
        }`}
      ></div>
    </div>
  );
};

export default RadioButton;
