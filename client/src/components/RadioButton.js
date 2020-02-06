import React from "react";

const RadioButton = ({ index, handler, text, isChecked, category }) => {
  let label;
  if (typeof text === "string") {
    label = text;
  } else {
    label = text[index];
  }

  return (
    <div
      className="radio-button__wrapper"
      onClick={() => handler(index, category)}
    >
      <span>{label}</span>
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
