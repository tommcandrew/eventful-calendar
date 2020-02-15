import React, { useContext, useState } from "react";
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
import AutoComplete from "./AutoComplete";

const Settings = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    showHolidays,
    setShowHolidays,
    supportedCountries,
    countryObj,
    setCountryObj
  } = useContext(HolidaysContext);

  const supportedCountryNames = supportedCountries.map(countryObj => {
    return countryObj.country_name;
  });

  //provide autocomplete component with whatever location is currently set as input value
  const [countryInput, setCountryInput] = useState(countryObj.name);

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

  //this actually only applies country setting as other settings are applied as soon as user clicks radio buttons
  const handleApplySettings = () => {
    const selectedCountryObj = supportedCountries.filter(
      country => country.country_name === countryInput
    )[0];
    setCountryObj({
      name: selectedCountryObj.country_name,
      code: selectedCountryObj["iso-3166"]
    });
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

        <div className="settings__radio-group settings__radio-group--location">
          <h2>Location:</h2>
          <AutoComplete
            options={supportedCountryNames}
            inputValue={countryInput}
            setInputValue={setCountryInput}
          />
        </div>
      </div>
      <button onClick={handleApplySettings} className="settings__ok-button">
        OK
      </button>
    </div>
  );
};

export default Settings;
