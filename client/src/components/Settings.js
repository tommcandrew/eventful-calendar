import React from "react";
import RadioGroup from "./RadioGroup";

const Settings = ({ closeModals }) => {
  return (
    <div className="modal" onClick={closeModals}>
      <div className="modal__content">
        <div className="settings-wrapper">
          <h1>Settings</h1>
          <div className="radio-groups-wrapper">
            <RadioGroup
              options={["English", "Español", "Français", "Türkçe"]}
              category="Language"
            />

            <RadioGroup options={["Light", "Dark"]} category="Theme" />

            <RadioGroup options={["True", "False"]} category="Show Holidays" />
          </div>
          <button onClick={closeModals} className="button button-done">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
