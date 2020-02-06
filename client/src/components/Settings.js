import React, { useContext } from "react";
import RadioButton from "./RadioButton";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import HolidaysContext from "../context/HolidaysContext";
import {
  settingsTextOptions,
  showHideTextOptions,
  languageTextOptions,
  themeTextOptions,
  holidaysTextOptions
} from "../data/otherText";
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
    <div className="modal" onClick={closeModals}>
      <div className="modal__content">
        <div className="settings">
          <h1>{settingsTextOptions[language]}</h1>
          <div className="settings__radio-groups">
            <div className="settings__radio-group">
              <h2>{languageTextOptions[language]}:</h2>
              {settingsOptions["Language"].map((optionText, i) => {
                return (
                  <RadioButton
                    key={i}
                    isChecked={optionText === language}
                    text={optionText}
                    index={i}
                    category={"Language"}
                    handler={handleRadioClick}
                  />
                );
              })}
            </div>

            <div className="settings__radio-group">
              <h2>{themeTextOptions[language]}:</h2>
              {settingsOptions["Theme"].map((optionText, i) => {
                return (
                  <RadioButton
                    key={i}
                    isChecked={optionText === theme}
                    text={[
                      <FontAwesomeIcon icon={faSun} />,
                      <FontAwesomeIcon icon={faMoon} />
                    ]}
                    index={i}
                    handler={handleRadioClick}
                    category={"Theme"}
                  />
                );
              })}
            </div>

            <div className="settings__radio-group">
              <h2>{holidaysTextOptions[language]}:</h2>
              {settingsOptions["Holidays"].map((optionText, i) => {
                return (
                  <RadioButton
                    key={i}
                    isChecked={optionText === showHolidays}
                    text={showHideTextOptions[language][i]}
                    index={i}
                    handler={handleRadioClick}
                    category={"Holidays"}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={closeModals}
            //second classname is checked in closeModals function in Calendar component
            className="settings__button button--done"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
