import React, { useContext } from "react";
import RadioGroup from "./RadioGroup";
import LanguageContext from "../context/LanguageContext";
import { settingsTextOptions } from "../data/otherText";

const Settings = ({ closeModals }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="modal" onClick={closeModals}>
      <div className="modal__content">
        <div className="settings">
          <h1>{settingsTextOptions[language]}</h1>
          <div className="settings__radio-groups">
            <RadioGroup
              options={{ text: ["English", "Español", "Français", "Türkçe"] }}
              category="Language"
            />

            <RadioGroup
              options={{ text: ["Light", "Dark"], symbols: [9788, 9790] }}
              category="Theme"
            />

            <RadioGroup
              options={{ text: ["Show", "Hide"], symbols: [10004, 10060] }}
              category="Holidays"
            />
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
