import React, { useContext } from "react";
import RadioButton from "./RadioButton";
import LanguageContext from "../2-context/LanguageContext";
import ThemeContext from "../2-context/ThemeContext";
import HolidaysContext from "../2-context/HolidaysContext";
import {
  settingsTextOptions,
  showHideTextOptions,
  languageTextOptions,
  themeTextOptions,
  holidaysTextOptions
} from "../3-data/otherText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Settings = ({ closeModals }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { showHolidays, setShowHolidays } = useContext(HolidaysContext);

  const settingsOptions = {
    Language: ["English", "Español", "Français", "Türkçe"],
    Theme: ["Light", "Dark"],
    Holidays: ["Show", "Hide"]
  };

  const themeIcons = [
    <FontAwesomeIcon icon={faSun} />,
    <FontAwesomeIcon icon={faMoon} />
  ];

  const handleRadioClick = (index, category) => {
    if (category === "Language") {
      setLanguage(settingsOptions["Language"][index]);
      return;
    }
    if (category === "Theme") {
      setTheme(settingsOptions["Theme"][index]);
      return;
    }
    if (category === "Holidays") {
      setShowHolidays(settingsOptions["Holidays"][index]);
      return;
    }
  };
  return (
    <div className="settings">
      <h1>{settingsTextOptions[language]}</h1>
      <div className="settings__radio-groups">
        <div className="settings__radio-group">
          <h2>{languageTextOptions[language]}:</h2>
          {settingsOptions["Language"].map((optionText, i) => {
            return (
              <RadioButton
                category={"Language"}
                handler={handleRadioClick}
                index={i}
                isChecked={optionText === language}
                key={i}
                label={optionText}
              />
            );
          })}
        </div>
        <div className="settings__radio-group">
          <h2>{themeTextOptions[language]}:</h2>
          {settingsOptions["Theme"].map((optionText, i) => {
            return (
              <RadioButton
                category={"Theme"}
                handler={handleRadioClick}
                index={i}
                isChecked={optionText === theme}
                key={i}
                label={themeIcons[i]}
              />
            );
          })}
        </div>
        <div className="settings__radio-group">
          <h2>{holidaysTextOptions[language]}:</h2>
          {settingsOptions["Holidays"].map((optionText, i) => {
            return (
              <RadioButton
                category={"Holidays"}
                handler={handleRadioClick}
                index={i}
                isChecked={optionText === showHolidays}
                key={i}
                label={showHideTextOptions[language][i]}
              />
            );
          })}
        </div>
      </div>
      <button onClick={closeModals} className="settings__ok-button">
        OK
      </button>
    </div>
  );
};

export default Settings;
