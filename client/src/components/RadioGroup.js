import React, { useContext } from "react";
import RadioButton from "./RadioButton";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import HolidaysContext from "../context/HolidaysContext";
import { languageTextOptions } from "../data/otherText";
import { themeTextOptions } from "../data/otherText";
import { holidaysTextOptions } from "../data/otherText";

const RadioGroup = ({ options, category }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { showHolidays, setShowHolidays } = useContext(HolidaysContext);

  let categoryText;
  if (category === "Language") {
    categoryText = languageTextOptions[language];
  } else if (category === "Theme") {
    categoryText = themeTextOptions[language];
  } else if (category === "Holidays") {
    categoryText = holidaysTextOptions[language];
  }

  const handleRadioClick = index => {
    if (category === "Language") {
      setLanguage(options.text[index]);
      return;
    }
    if (category === "Theme") {
      setTheme(options.text[index]);
      return;
    }
    if (category === "Holidays") {
      setShowHolidays(options.text[index]);
      return;
    }
  };

  return (
    <div className="radio-group">
      <h2>{categoryText}:</h2>
      {options.text.map((optionText, i) => {
        return (
          <RadioButton
            key={i}
            isChecked={
              optionText === language ||
              optionText === theme ||
              optionText === showHolidays
            }
            text={
              options.symbols
                ? String.fromCharCode(options.symbols[i])
                : optionText
            }
            value={optionText}
            index={i}
            handler={handleRadioClick}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
