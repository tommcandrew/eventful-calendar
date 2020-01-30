import React, { useContext } from "react";
import RadioButton from "./RadioButton";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import HolidaysContext from "../context/HolidaysContext";

const RadioGroup = ({ options, category }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { showHolidays, setShowHolidays } = useContext(HolidaysContext);

  const handleRadioClick = index => {
    if (category === "Language") {
      setLanguage(options[index]);
      return;
    }
    if (category === "Theme") {
      setTheme(options[index]);
      return;
    }
    if (category === "Show Holidays") {
      setShowHolidays(options[index]);
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
            isChecked={
              option === language || option === theme || option === showHolidays
            }
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
