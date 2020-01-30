import React, { useContext } from "react";
import RadioButton from "./RadioButton";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

const RadioGroup = ({ options, category }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleRadioClick = index => {
    if (category === "Language") {
      setLanguage(options[index]);
      return;
    }
    if (category === "Theme") {
      setTheme(options[index]);
      return;
    }
  };

  return (
    <div className="all-options">
      <h2>{category}:</h2>
      {options.map((option, i) => {
        return (
          <RadioButton
            key={i}
            isChecked={option === language || option === theme}
            text={option}
            value={option}
            index={i}
            handler={handleRadioClick}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
